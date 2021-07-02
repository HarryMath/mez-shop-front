import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CatalogService} from '../../shared/catalog.service';
import {Router} from '@angular/router';
import {EngineDetails} from '../../shared/models';
import {CartService} from '../../shared/cart.service';

@Component({
  selector: 'app-engine-page',
  templateUrl: './engine-page.component.html',
  styleUrls: ['./engine-page.component.css']
})
export class EnginePageComponent implements OnInit, OnDestroy{

  engine: EngineDetails = {
    id: 0, name: '', type: {
      name: '', shortDescription: '', fullDescription: '', photo: null
    }, manufacturer: '', price: 0, mass: 0, photo: '',
    characteristics: [],
    photos: []
  };
  engineLoaded = false;
  photos: string[] = [];
  activePhoto = 0;
  amount = 1;
  galleryOpened = false;
  state: 'in'|'btn-loading'|'' = '';

  constructor(private catalogService: CatalogService,
              private chartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.engineLoaded = false; // @ts-ignore
    document.body.scroll(0, 0);
    const path = this.router.url.split('/');
    const id = path[path.length - 1].split('?')[0];
    this.activePhoto = 0;
    this.amount = 1;
    this.catalogService.loadEngine(id)
      .subscribe(response => {
        this.engine = response;
        this.photos = this.engine.photos;
        if (this.engine.photo !== null && this.engine.photo.length > 5) {
          this.photos.unshift(this.engine.photo);
        }
        this.engineLoaded = true;
      },
      error => { // @ts-ignore
        window.message.show('не удается загрузить данные');
        console.warn(error);
      });
  }

  more(): void {
    this.amount += 1;
  }

  less(): void {
    if (this.amount > 1) {
      this.amount -= 1;
    }
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
      this.chartService.add(this.engine, this.amount).then(() => {
        setTimeout(() => {this.state = 'in'; }, 200);
      });
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
}
