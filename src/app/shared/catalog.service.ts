import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {endpoint} from './request';
import {CategoryPreview, EngineDetails, EnginePreview, FilterBlock, Manufacturer} from './models';

@Injectable({providedIn: 'root'})
export class CatalogService {

  engines: EnginePreview[] = [];
  manufacturers: Manufacturer[] = [
    {name: 'ОАО «Могилевлифтмаш»'}
    ];
  categories: CategoryPreview[] = [
    {name: '4BP', photo: '/assets/photo.png', shortDescription: 'Взрывозащищенные двигатели серии 4ВР'},
    {name: 'АИР', photo: '/assets/photo.png', shortDescription: 'Электродвигатели общепромышленного назначения'},
    {name: 'АИРС', photo: '/assets/photo.png', shortDescription: 'Двигатели с повышенным скольжением'},
    {name: 'Электродвигатели CENELEC (AIS)', photo: '/assets/photo.png', shortDescription: 'Двигатели асинхронные серии АIS'},
  ];
  scrollHeight = 0;

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
    {name: 'кпд', queryName: 'efficiency', opened: true, options: [
        {name: '< 40%', queryName: '0-40', selected: false},
        {name: '40% - 60%', queryName: '40-60', selected: false},
        {name: '60% - 70%', queryName: '60-70', selected: false},
        {name: '70% - 80%', queryName: '70-80', selected: false},
        {name: '80% - 90%', queryName: '80-90', selected: false},
        {name: '> 90%', queryName: '90-9920', selected: false},
      ]},
    {name: 'номинальная частота', queryName: 'frequency', opened: true, options: [
        {name: '< 1000 об/мин', queryName: '0-100', selected: false},
        {name: '1000 - 1700 об/мин', queryName: '1000-1700', selected: false},
        {name: '1700 - 2400 об/мин', queryName: '1700-2400', selected: false},
        {name: '2400 - 3000 об/мин', queryName: '2400-3000', selected: false},
        {name: '> 3000 об/мин', queryName: '3000-9999999', selected: false},
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

  loadEngines(): void {
    let query = 'amount=' + this.enginesOnPage;
    query += '&offset=' + ((this.page - 1) * this.enginesOnPage);
    query += '&' + this.query;
    this.catalogLoaded = false;
    this.http.get<EnginePreview[]>(endpoint + '/engines/find?' + query).subscribe(response => {
      this.catalogLoaded = true;
      this.engines = response;
    });
  }

  countEngines(): void {
    this.http.get<number>(endpoint + '/engines/count' +
      (this.query.length > 0 ? '?' + this.query : '')).subscribe(amount => {
      if (amount >= 0) {
        this.quantity = amount;
        this.totalPages = Math.ceil(amount / this.enginesOnPage);
        if (this.totalPages < this.page) {
          this.loadEngines();
          this.page = 1;
        }
      }
    });
  }

  getAmount(query: string): Observable<number> {
    return this.http.get<number>(endpoint + '/engines/count' +
      (query.length > 0 ? '?' + query : ''));
  }

  loadCategories(): Observable<CategoryPreview[]> {
    return this.http.get<CategoryPreview[]>(endpoint + '/categories?withDetails=false')
      .pipe(tap(response => {
        if (response && response.length > 0) {
          this.categories = response;
        }
      }));
  }

  loadManufacturers(): void {
    this.http.get<Manufacturer[]>(endpoint + '/manufacturers')
      .subscribe(response => {
        if (response.length && response[0].name && response[0].name.length) {
          this.manufacturers = response;
        }
      });
  }

  loadEngine(id: string): Observable<EngineDetails> {
    return this.http.get<EngineDetails>(endpoint + '/engines/' + id + '?withDetails=true');
  }

  clearFilters(): void {
    this.filters.forEach(filter => {
      filter.options.forEach(option => {
        option.selected = false;
      });
    });
    this.search = '';
  }
}
