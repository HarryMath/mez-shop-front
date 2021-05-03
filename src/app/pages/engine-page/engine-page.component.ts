import { Component, OnInit } from '@angular/core';
import {CatalogService, EngineDetails} from '../../shared/catalog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-engine-page',
  templateUrl: './engine-page.component.html',
  styleUrls: ['./engine-page.component.css']
})
export class EnginePageComponent implements OnInit {

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
  inCart = false;

  constructor(private catalogService: CatalogService, private router: Router) { }

  ngOnInit(): void {
    const path = this.router.url.split('/');
    const id = path[path.length - 1].split('?')[0];
    this.catalogService.loadEngine(id)
      .subscribe(response => {
        this.engine = response;
        this.photos = this.engine.photos;
        this.photos.unshift(this.engine.photo);
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
    return this.engine.type.fullDescription.length > 3 ?
      this.engine.type.fullDescription :
      this.engine.type.shortDescription;
  }

  getPower(): string {
    let result = '';
    for (let i = 0; i < this.engine.characteristics.length; i++) {
      result += this.engine.characteristics[i].power;
      if (i !== this.engine.characteristics.length - 1) { result += '/'; }
    }
    return result;
  }
}
