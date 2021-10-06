import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private router: Router) { }

  private static readonly translate: Map<string, string> = new Map<string, string>(
      [['home', 'Главная'],
      ['news', 'новости'],
      ['cart', 'корзина'],
      ['contacts', 'котакты'],
      ['general-info', 'общие сведения'],
      ['about', 'о компании'],
      ['bearings', 'опорно-поворотные устройства'],
      ['gearMotors', 'Редуктора и мотор редуктора'],
      ['acoustic', 'Электроакустические приборы'],
      ['catalog', 'каталог']]);

  @Input() customStyle: string|undefined;
  path: string[] = [];

  ngOnInit(): void {
    this.path = this.router.url.split('/');
    for (let i = 0; i < this.path.length; i++) {
      if (this.path[i].includes('?')) {
        this.path[i] = this.path[i].split('?')[0];
      }
      if (this.path[i] === '') {
        this.path.splice(i, 1);
        i--;
      }
    }
  }

  getStyle(): string {
    return this.customStyle !== undefined ? this.customStyle : '';
  }

  getName(i: number): string {
    if (MapComponent.translate.has(this.path[i])) { // @ts-ignore
      return  MapComponent.translate.get(this.path[i]);
    }
    return decodeURIComponent(this.path[i])
      .replace(/%252F/g, '/')
      .replace(/%2F/g, '/');
  }

  getLink(i: number): string {
    let link = '';
    for (let j = 0; j <= i; j++) {
      link += '/' + decodeURI(this.path[j]);
    }
    return link;
  }
}
