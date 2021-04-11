import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/menu.service';

export interface FilterBlock {
  name: string;
  opened: boolean;
  options: FilterOption[];
}

export interface FilterOption {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  filters: FilterBlock[] = [
    {name: 'тип', opened: true, options: [
        {name: 'Стандартные двигатели', selected: false},
        {name: 'Двигатели для нефтегазовой промышленности', selected: false},
        {name: 'Двигатели для объектов использования ядерного топлива', selected: false},
        {name: 'Многоскоростные двигатели', selected: false},
        {name: 'Двигатели с электромагнитным тормозом', selected: false},
        {name: 'Двигатели с повышенным скольжениемм', selected: false},
        {name: 'Тяговые двигатели', selected: false},
        {name: 'Двигатели с повышенным скольжениемм', selected: false},
        {name: 'Узкоспециализированные двигатели', selected: false},
        {name: 'Встраиваемые двигатели', selected: false},
        {name: 'Бытовые однофазные двигатели типа ДАК', selected: false},
        {name: 'Товары народного потребления', selected: false},
        {name: 'Электроакустические приборы', selected: false},
      ]},
    {name: 'производитель', opened: true, options: [
        {name: 'производитель 1', selected: false},
        {name: 'производитель 2', selected: false},
        {name: 'производитель 3', selected: false},
      ]}
  ];

  constructor(public menuService: MenuService) { }

  toggleFilter(filter: FilterBlock): void {
    try {
      const filterElement = document.getElementById('f' + filter.name); // @ts-ignore
      filterElement.style.cssText = 'height: ' + filterElement.offsetHeight + 'px';
      if (filter.opened) { // @ts-ignore
        filterElement.setAttribute('openedHeight', filterElement.offsetHeight); // @ts-ignore
        setTimeout(() => { filterElement.style.cssText = ''; }, 5); // @ts-ignore
      } else if (filterElement.getAttribute('openedHeight')) {
        setTimeout(() => { // @ts-ignore
            filterElement.style.cssText = 'height: ' + filterElement.getAttribute('openedHeight') + 'px';
          }, 5);
      }
    } catch (e) {
      console.warn(e);
    }
    filter.opened = !filter.opened;
  }

  ngOnInit(): void {
  }

}
