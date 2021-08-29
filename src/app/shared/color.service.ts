import {Injectable} from '@angular/core';

export interface Color {
  hsla: HSLA;
  isLight: boolean;
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HSLA {
  h: number;
  s: number;
  l: number;
  a: number;
}

@Injectable({providedIn: 'root'})
export class ColorService {

  async getAverageColor(imageURL: string, opacity: number, callBack: (color: Color) => void): Promise<void> {
    const blockSize = 55;
    const defaultRGBA: RGBA = {r: 0, g: 0, b: 0, a: 0.8};
    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');
    const resultRGBA: RGBA = {r: 0, g: 0, b: 0, a: opacity};
    if (!context) {
      callBack({hsla: this.rgbaToHsla(defaultRGBA), isLight: false});
    } else {
      const imageElement = new Image();
      imageElement.onload = (): void => {
        context.drawImage(imageElement, 0, 0);
        const height = canvas.height = imageElement.naturalHeight || 140;
        const width = canvas.width = imageElement.naturalWidth || 140;
        context.fillStyle = 'rgb(253, 254, 249)';
        context.fillRect(0, 0, width, height);
        context.drawImage(imageElement, 0, 0);
        try {
          const data = context.getImageData(0, 0, width, height);
          const length = data.data.length;
          let transparentCounter = 0;
          let i = 0;
          let r; let g; let b;
          let count = 0;
          while ( i < length ) {
            r = data.data[i];
            g = data.data[i + 1];
            b = data.data[i + 2];
            if ((r === 253 && g === 254 && b === 249)) {
              transparentCounter++;
            } else if (!this.isGray(r, g, b, 45)) {
              resultRGBA.r += r;
              resultRGBA.g += g;
              resultRGBA.b += b;
              i += blockSize * 4;
              count++;
            }
            i += blockSize * 4;
          }
          const transparentPart = transparentCounter / count;
          resultRGBA.r = Math.floor(resultRGBA.r / count);
          resultRGBA.g = Math.floor(resultRGBA.g / count);
          resultRGBA.b = Math.floor(resultRGBA.b / count);
          const isLight = this.getLightness(resultRGBA) > 0.7;
          let hsla: HSLA = this.rgbaToHsla(resultRGBA);
          if (this.isGray(resultRGBA.r, resultRGBA.g, resultRGBA.b, 50) && transparentPart > 0.5) {
            hsla = this.generateHSL(imageURL);
            console.log(imageURL + ': ', resultRGBA);
            hsla = this.exchangeColor(hsla, isLight, 7);
          } else {
            hsla = this.exchangeColor(hsla, isLight, 1.5);
          }
          callBack({isLight : hsla.l > 50, hsla});
        } catch (ignore) {
          console.warn(ignore);
          callBack({hsla: this.rgbaToHsla(defaultRGBA), isLight: false});
        }
      };
      imageElement.crossOrigin = 'Anonymous';
      imageElement.src = imageURL.replace('http', 'https');
    }
  }

  generateHSL(text: string): HSLA {
    const t = text.toLowerCase();
    let hSum = 0;
    for (let i = 0; i < t.length; i++) {
      hSum += t.charCodeAt(i);
    }
    const h = Math.abs(t.charCodeAt(0) + hSum) % 361;
    const s = Math.abs(30 + (( t.charCodeAt(0) + t.charCodeAt(t.length - 1) ) % 120) / 120 * (90 - 40)) % 91;
    const l = Math.abs(45 + (( t.charCodeAt(2) * 2 + t.charCodeAt(0) ) % (123 - 95)) / (123 - 95) * (95 - 75)) % 96;
    return {h, s, l, a: 1};
  }

  isGray(r: number, g: number, b: number, grayScale: number): boolean {
    const rR = Math.floor(r / grayScale);
    const rG = Math.floor(g / grayScale);
    const rB = Math.floor(b / grayScale);
    return rR === rG && rG === rB && r < 235 && r > 10;
  }

  getLightness(rgb: RGBA): number {
    return Math.sqrt(rgb.r * rgb.r + rgb.g * rgb.g + rgb.b + rgb.b) / 255;
  }

  rgbaToHsla(rgba: RGBA): HSLA {
    const r = rgba.r / 255;
    const g = rgba.g / 255;
    const b = rgba.b / 255;
    const a = rgba.a;
    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;
    if (delta === 0) {
      h = 0;
    }
    else if (cmax === r) { h = ((g - b) / delta) % 6; }
    else if (cmax === g) { h = (b - r) / delta + 2; }
    else { h = (r - g) / delta + 4; }
    h = Math.round(h * 60);
    if (h < 0) { h += 360; }
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return {h, s, l, a};

  }

  exchangeColor(hsla: HSLA, isLight: boolean, power: number): HSLA {
    hsla.s = hsla.s * 1.25 * power + 13;
    if (isLight) {
      hsla.l = (hsla.l + 100 * (1.7 + power)) / (2.7 + power);
    } else {
      hsla.l = hsla.l / (1 + power);
    }
    if (hsla.s > 100) { hsla.s = 100; }
    return hsla;
  }
}
