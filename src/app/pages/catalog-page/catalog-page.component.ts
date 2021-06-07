import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../shared/menu.service';
import {CatalogService} from '../../shared/catalog.service';
import {ActivatedRoute, Router} from '@angular/router';

export interface FilterBlock {
  name: string;
  queryName: string;
  opened: boolean;
  options: FilterOption[];
}

export interface FilterOption {
  name: string;
  queryName: string;
  selected: boolean;
}

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  filters: FilterBlock[] = [
    {name: 'тип', queryName: 'types', opened: true, options: [
        {name: '4BP', queryName: '4BP', selected: false},
        {name: 'АИР', queryName: 'АИР', selected: false},
        {name: 'АИРЕ', queryName: 'АИРЕ', selected: false},
        {name: 'Электродвигатели CENELEC (AIS)', queryName: 'Электродвигатели CENELEC (AIS)', selected: false},
        {name: 'АИРС', queryName: 'АИРС', selected: false},
        {name: 'Специальные электродвигатели', queryName: 'Специальные электродвигатели', selected: false}
      ]},
    {name: 'производитель', queryName: 'manufacturers', opened: true, options: [
        {name: 'ОАО «Могилевлифтмаш»', queryName: 'ОАО «Могилевлифтмаш»', selected: false},
      ]},
    {name: 'фазы', queryName: 'phase', opened: true, options: [
        {name: '1', queryName: '1', selected: false},
        {name: '2', queryName: '2', selected: false},
        {name: '3', queryName: '3', selected: false},
      ]},
    {name: 'вольтаж', queryName: 'voltage', opened: true, options: [
        {name: '< 50 В', queryName: '0-50', selected: false},
        {name: '50 - 100 В', queryName: '50-100', selected: false},
        {name: '100 - 200 В', queryName: '100-200', selected: false},
        {name: '200 - 400 В', queryName: '200-400', selected: false},
        {name: '> 400 В', queryName: '400-9999999', selected: false},
      ]},
    {name: 'номинальная частота', queryName: 'frequency', opened: true, options: [
        {name: '< 500 об/мин', queryName: '0-500', selected: false},
        {name: '500 - 1000 об/мин', queryName: '500-1000', selected: false},
        {name: '1000 - 1500 об/мин', queryName: '1000-1500', selected: false},
        {name: '1500 - 2000 об/мин', queryName: '1500-2000', selected: false},
        {name: '> 2000 об/мин', queryName: '2000-9999999', selected: false},
      ]},
    {name: 'мощность', queryName: 'power', opened: true, options: [
        {name: '< 0.5 кВт', queryName: '0-0.5', selected: false},
        {name: '0.5 - 1 кВт', queryName: '0.5-1', selected: false},
        {name: '1 - 2 кВт', queryName: '1-2', selected: false},
        {name: '2 - 6 кВт', queryName: '2-6', selected: false},
        {name: '> 6 кВт', queryName: '6-9999', selected: false},
      ]}
  ];
  catalogLoaded = false;
  quantity = 0;
  title = 'Все товары';
  search = '';

  constructor(public menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router,
              public catalogService: CatalogService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  toggleFilterBlock(filter: FilterBlock): void {
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

  removeFilters(): void {
    this.filters.forEach(filter => {
      filter.options.forEach(option => {
        option.selected = false;
      });
    });
    this.title = 'Все товары';
    this.search = '';
    this.reloadCatalog();
  }

  reloadCatalog(): void {
    let query = '';
    for (const filterBlock of this.filters) {
      let subQuery = '&' + filterBlock.queryName + '=';
      let selectedOptions = 0;
      for (const option of filterBlock.options) {
        if (option.selected) {
          subQuery += option.queryName + ',';
          selectedOptions ++;
        }
      }
      if (selectedOptions > 0) {
        subQuery = subQuery.substring(0, subQuery.length - 1);
        query += subQuery;
      }
    }
    if (this.search.length > 0) {
      query += '&query=' + this.search;
    }
    query = query.substring(1, query.length);
    console.log(query);
    this.catalogService.countEngines(query).subscribe(response => {
      if (response > 0) {
        this.quantity = response;
      }
    });
    this.catalogService.loadEngines(query).subscribe(() => {
      this.catalogLoaded = true;
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('c')) {
      const categoriesParam = this.route.snapshot.queryParamMap.get('c'); // @ts-ignore
      this.title = categoriesParam?.replace(',', ', '); // @ts-ignore
      this.updateCategories(categoriesParam.split(','));
    }
    if (this.route.snapshot.queryParamMap.has('q')) { // @ts-ignore
      this.search = this.route.snapshot.queryParamMap.get('q');
      this.title = '"' + this.search + '"';
    }
    this.reloadCatalog();
  }

  updateCategories(categories: string[]): void {
    for (const filterBlock of this.filters) {
      if (filterBlock.name === 'тип') {
        for (const option of filterBlock.options) {
          for (const category of categories) {
            if (option.name === category) {
              option.selected = true;
              break;
            }
          }
        }
        break;
      }
    }
  }
}
