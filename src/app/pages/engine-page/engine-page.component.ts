import {Component, OnDestroy, OnInit} from '@angular/core';
import {CatalogService} from '../../shared/catalog.service';
import {Router} from '@angular/router';
import {Characteristics, EngineDetails} from '../../shared/models';
import {CartService} from '../../shared/cart.service';

interface PriceBlock {
  montage: 'лапы'|'комби'|'фланец';
  price: number;
  amount: number;
}

@Component({
  selector: 'app-engine-page',
  templateUrl: './engine-page.component.html',
  styleUrls: ['./engine-page.component.css']
})
export class EnginePageComponent implements OnInit, OnDestroy{

  engine: EngineDetails = {
    axisHeight: 0, characteristics: [], manufacturer: '', mass: 0, photo: '',
    photos: [], priceCombi: 0, priceFlanets: 0, priceLapy: 0, type: {
      name: '', shortDescription: '', fullDescription: '', photo: null
    }, name: ''
  };
  engineLoaded = false;
  photos: string[] = [];
  activePhoto = 0;
  priceBlocks: PriceBlock[] = [
    {montage: 'лапы', amount: 1, price: 0},
    {montage: 'комби', amount: 0, price: 0},
    {montage: 'фланец', amount: 0, price: 0}];
  galleryOpened = false;
  state: 'in'|'btn-loading'|'' = '';
  characteristics: string[][] = [];


  hasPower = false;
  hasFrequency = false;
  hasEfficiency = false;
  hasCosFi = false;
  hasElectricity115 = false;
  hasElectricity220 = false;
  hasElectricity380 = false;
  hasElectricityRatio = false;
  hasMomentsRatio = false;
  hasMomentsMaxRatio = false;
  hasMomentsMinRatio = false;
  hasVoltage115 = false;
  hasVoltage220230 = false;
  hasCpacity115 = false;
  hasCpacity220 = false;
  hasCpacity230 = false;
  hasCriticalSlipping = false;

  constructor(private catalogService: CatalogService,
              private chartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.engineLoaded = false;
    document.body.scrollTop = 0;
    const path = this.router.url.split('/');
    const name = path[path.length - 1].split('?')[0];
    this.activePhoto = 0;
    this.catalogService.loadEngine(name)
      .subscribe(response => {
        this.engine = response;
        this.photos = this.engine.photos;
        if (this.engine.photo !== null && this.engine.photo.length > 5) {
          this.photos.unshift(this.engine.photo);
        }
        this.priceBlocks[0].price = response.priceLapy;
        this.priceBlocks[1].price = response.priceCombi;
        this.priceBlocks[2].price = response.priceFlanets;
        this.setUpCharacteristics();
        this.engineLoaded = true;
      },
      error => { // @ts-ignore
        window.message.show('не удается загрузить данные');
        console.warn(error);
      });
  }

  getName(): string {
    return this.engine.name.replace('%252F', '/');
  }

  more(montage: 'лапы'|'комби'|'фланец'): void {
    this.priceBlocks.forEach(b => {
      if (b.montage === montage) {
        b.amount++;
        return;
      }
    });
  }

  less(montage: 'лапы'|'комби'|'фланец'): void {
    this.priceBlocks.forEach(b => {
      if (b.montage === montage) {
        if (b.amount > 0) {
          b.amount--;
        }
        return;
      }
    });
  }

  hasDescription(): boolean {
    return this.engine.type.fullDescription.length > 3 ||
      this.engine.type.shortDescription.length > 3;
  }

  getDescription(): string {
    const text = this.engine.type.fullDescription.length > 3 ?
      this.engine.type.fullDescription :
      this.engine.type.shortDescription;
    let result = '';
    for (const s of text.split('\n')) {
      result += '<div class="p">' + s + '</div>';
    }
    return result;
  }

  getPower(): string {
    let result = '';
    for (let i = 0; i < this.engine.characteristics.length; i++) {
      result += this.engine.characteristics[i].power +  ' кВт';
      if (i !== this.engine.characteristics.length - 1) { result += ', '; }
    }
    return result;
  }

  adToCart(): void {
    if (this.state === '') {
      this.state = 'btn-loading';
      const amountLapy = this.priceBlocks[0].amount;
      const amountCombi = this.priceBlocks[1].amount;
      const amountFlanets = this.priceBlocks[2].amount;
      if (amountLapy + amountCombi + amountFlanets > 0) {
        this.chartService.add(this.engine, amountLapy, amountCombi, amountFlanets).then(() => {
          setTimeout(() => {this.state = 'in'; }, 200);
        });
      }
    }
  }

  nextPhoto(): void {
    this.activePhoto = (this.activePhoto + 1) % (this.photos.length);
  }

  prevPhoto(): void {
    this.activePhoto = this.activePhoto > 0 ?
      this.activePhoto - 1 : this.photos.length - 1;
  }

  getHeightCss(): string {
    return 'height: ' + Math.round(window.innerHeight * 1.000001 + 1) + 'px';
  }

  ngOnDestroy(): void {
    this.engineLoaded = false;
  }

  private setUpCharacteristics(): void {
    this.engine.characteristics.forEach(c => {
      this.hasPower = c.power > 0 || this.hasPower;
      this.hasFrequency = c.frequency > 0 || this.hasFrequency;
      this.hasEfficiency = c.efficiency > 0 || this.hasEfficiency;
      this.hasCosFi = c.cosFi > 0 || this.hasCosFi;
      this.hasElectricity115 = c.electricityNominal115 > 0 || this.hasElectricity115;
      this.hasElectricity220 = c.electricityNominal220 > 0 || this.hasElectricity220;
      this.hasElectricity380 = c.electricityNominal380 > 0 || this.hasElectricity380;
      this.hasElectricityRatio = c.electricityRatio > 0 || this.hasElectricityRatio;
      this.hasMomentsRatio = c.momentsRatio > 0 || this.hasMomentsRatio;
      this.hasMomentsMaxRatio = c.momentsMaxRatio > 0 || this.hasMomentsMaxRatio;
      this.hasMomentsMinRatio = c.momentsMinRatio > 0 || this.hasMomentsMinRatio;
      this.hasVoltage115 = c.voltage115 > 0 || this.hasVoltage115;
      this.hasVoltage220230 = c.voltage220_230 > 0 || this.hasVoltage220230;
      this.hasCpacity115 = c.capacity115 > 0 || this.hasCpacity115;
      this.hasCpacity220 = c.capacity220 > 0 || this.hasCpacity220;
      this.hasCpacity230 = c.capacity230 > 0 || this.hasCpacity230;
      this.hasCriticalSlipping = c.criticalSlipping > 0 || this.hasCriticalSlipping;
    });
  }

  getElectricity(row: Characteristics): string {
    const list: number[] = [];
    if (this.hasElectricity115) {
      list.push(row.electricityNominal115);
    }
    if (this.hasElectricity220) {
      list.push(row.electricityNominal220);
    }
    if (this.hasElectricity380) {
      list.push(row.electricityNominal380);
    }
    return list.join(', ');
  }

  getVoltage(row: Characteristics): string {
    const list: number[] = [];
    if (this.hasVoltage115) {
      list.push(row.voltage115);
    }
    if (this.hasVoltage220230) {
      list.push(row.voltage220_230);
    }
    return list.join(', ');
  }

  getCapacity(row: Characteristics): string {
    const list: number[] = [];
    if (this.hasCpacity115) {
      list.push(row.capacity115);
    }
    if (this.hasCpacity220) {
      list.push(row.capacity220);
    }
    if (this.hasCpacity230) {
      list.push(row.capacity230);
    }
    return list.join(', ');
  }

  getElectricityDescription(): string {
    let result = 'номинальный ток, указан для напряжени';
    const list: string[] = [];
    let counter = 0;
    if (this.hasElectricity115) {
      list.push('115В'); counter++;
    }
    if (this.hasElectricity220) {
      list.push('220В'); counter++;
    }
    if (this.hasElectricity380) {
      list.push('380В'); counter++;
    }
    result += counter > 1 ? 'й' : 'я';
    return result + ' ' + list.join(', ');
  }

  getVoltageDescription(): string {
    let result = 'номинальное напряжение рабочего конденсатора, указано для напряжени';
    const list: string[] = [];
    let counter = 0;
    if (this.hasVoltage115) {
      list.push('115В'); counter++;
    }
    if (this.hasVoltage220230) {
      list.push('220В/230'); counter++;
    }
    result += counter > 1 ? 'й' : 'я';
    return result + ' ' + list.join(', ');
  }

  getCapacityDescription(): string {
    let result = 'номинальная емкость рабочего конденсатора, указана для напряжени';
    const list: string[] = [];
    let counter = 0;
    if (this.hasCpacity115) {
      list.push('115В'); counter++;
    }
    if (this.hasCpacity220) {
      list.push('220В'); counter++;
    }
    if (this.hasCpacity230) {
      list.push('230В'); counter++;
    }
    result += counter > 1 ? 'й' : 'я';
    return result + ' ' + list.join(', ');
  }

  getPrice(): number {
    let sum = 0;
    this.priceBlocks.forEach(b => {
      sum += b.amount * b.price;
    });
    return sum;
  }
}
