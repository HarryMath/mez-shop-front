import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {endpoint} from './request';
import {CategoryPreview, EngineDetails, EnginePreview, FilterBlock} from './models';

@Injectable({providedIn: 'root'})
export class CatalogService {

  engines: EnginePreview[] = [];
  categories: CategoryPreview[] = [
    {name: '4BP', photo: '/assets/photo.png', shortDescription: 'Взрывозащищенные двигатели серии 4ВР'},
    {name: 'АИР', photo: '/assets/photo.png', shortDescription: 'Электродвигатели общепромышленного назначения'},
    {name: 'АИРС', photo: '/assets/photo.png', shortDescription: 'Двигатели с повышенным скольжением'},
    {name: 'Электродвигатели CENELEC (AIS)', photo: '/assets/photo.png', shortDescription: 'Двигатели асинхронные серии АIS'},
  ];

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
  enginesOnPage = 12;

  catalogLoaded = false;
  query = '';
  page = 1;
  quantity = 0;
  totalPages = 1;
  search = '';

  constructor(private http: HttpClient) {}

  refreshQuery(): void {
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
    this.query = query.substring(1, query.length);
    console.log(this.query);
  }

  loadEngines(): void {
    let query = 'amount=' + this.enginesOnPage;
    query += '&offset=' + ((this.page - 1) * this.enginesOnPage);
    query += '&' + this.query;
    this.catalogLoaded = false;
    this.http.get<EnginePreview[]>(endpoint + '/engines?' + query).subscribe(response => {
      this.catalogLoaded = true;
      this.engines = response;
    });
  }

  countEngines(): void {
    this.http.get<number>(endpoint + '/engines/count' +
      (this.query.length > 0 ? '?' + this.query : '')).subscribe(amount => {
      if (amount > 0) {
        this.quantity = amount;
        this.totalPages = Math.ceil(amount / this.enginesOnPage);
        if (this.totalPages < this.page) {
          this.loadEngines();
          this.page = 1;
        }
      }
    });
  }

  loadCategories(): Observable<CategoryPreview[]> {
    return this.http.get<CategoryPreview[]>(endpoint + '/categories?withDetails=false')
      .pipe(tap(response => {
        if (response && response.length > 0) {
          this.categories = response;
        }
      }));
  }

  loadEngine(id: string): Observable<EngineDetails> {
    return this.http.get<EngineDetails>('https://mez-api.herokuapp.com/engines/' + id + '?withDetails=true');
  }

}
