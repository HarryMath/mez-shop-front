import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
      ['contacts', 'котакты'],
      ['catalog', 'каталог']]);

  @Input() customStyle: string|undefined;
  path: string[] = [];

  ngOnInit(): void {
    this.path = this.router.url.split('/');
    for (let i = 0; i < this.path.length; i++) {
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
    return this.path[i];
  }

  getLink(i: number): string {
    let link = '';
    for (let j = 0; j <= i; j++) {
      link += '/' + this.path[j];
    }
    return link;
  }
}