import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {

  static readonly mapsApiKey = 'AIzaSyAw1JECtjzsQ_xM0LEOX2X44nzDX-Yqge8';

  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
