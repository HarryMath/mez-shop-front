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
    {name: 'АИР', linkName: '', photo: '/assets/photo.png', shortDescription: 'Электродвигатели общепромышленного назначения'},
    {name: 'АИРЕ', linkName: '', photo: '/assets/photo.png', shortDescription: 'Однофазные двигатели серии АИРЕ'},
    {name: '4BP', linkName: '', photo: '/assets/photo.png', shortDescription: 'Взрывозащищенные двигатели серии 4ВР'},
    {name: 'АИРС', linkName: '', photo: '/assets/photo.png', shortDescription: 'Двигатели с повышенным скольжением'},
    {name: 'AIS', linkName: '', photo: '/assets/photo.png', shortDescription: 'Двигатели асинхронные серии АIS'},
  ];
  bodyScroll = 0;
  orderBy: 'engines.name DESC'|
    'engines.priceLapy DESC'|
    'engines.priceLapy'|
    'engines.axisHeight'|
    'engines.axisHeight DESC' = 'engines.axisHeight';

  filters: FilterBlock[] = [
    {name: 'тип', queryName: 'types', opened: false, options: [
        {name: 'АИР', queryName: 'АИР', selected: false},
        {name: 'АИРЕ', queryName: 'АИРЕ', selected: false},
        {name: 'АИРС', queryName: 'АИРС', selected: false},
        {name: '4ВР', queryName: '4ВР', selected: false},
        {name: 'AIS', queryName: 'AIS', selected: false},
        {name: 'Специальные электродвигатели', queryName: 'Специальные электродвигатели', selected: false}
      ]},
    {name: 'высота оси', queryName: 'axisHeight', opened: false, options: [
        {name: '56мм', queryName: '56', selected: false},
        {name: '63мм', queryName: '63', selected: false},
        {name: '71мм', queryName: '71', selected: false},
        {name: '80мм', queryName: '80', selected: false},
        {name: '90мм', queryName: '90', selected: false},
        {name: '100мм', queryName: '100', selected: false},
        {name: '112мм', queryName: '112', selected: false},
        {name: '132мм', queryName: '132', selected: false},
        {name: '160мм', queryName: '160', selected: false},
        {name: '180мм', queryName: '180', selected: false},
      ]},
    {name: 'номинальная частота', queryName: 'frequency', opened: false, options: [
        {name: '< 1000 об/мин', queryName: '0-100', selected: false},
        {name: '1000 - 1700 об/мин', queryName: '1000-1700', selected: false},
        {name: '1700 - 2400 об/мин', queryName: '1700-2400', selected: false},
        {name: '2400 - 3000 об/мин', queryName: '2400-3000', selected: false},
        {name: '> 3000 об/мин', queryName: '3000-9999999', selected: false},
      ]},
    {name: 'мощность', queryName: 'power', opened: false, options: [
        {name: '< 1 кВт', queryName: '0-1', selected: false},
        {name: '1 - 3 кВт', queryName: '1-3', selected: false},
        {name: '3 - 9 кВт', queryName: '3-9', selected: false},
        {name: '9 - 20 кВт', queryName: '9-20', selected: false},
        {name: '> 20 кВт', queryName: '20-9999', selected: false},
      ]},
    {name: 'кпд', queryName: 'efficiency', opened: false, options: [
        {name: '< 40%', queryName: '0-40', selected: false},
        {name: '40% - 60%', queryName: '40-60', selected: false},
        {name: '60% - 70%', queryName: '60-70', selected: false},
        {name: '70% - 80%', queryName: '70-80', selected: false},
        {name: '80% - 90%', queryName: '80-90', selected: false},
        {name: '> 90%', queryName: '90-9920', selected: false},
      ]},
    {name: 'фазы', queryName: 'phase', opened: false, options: [
        {name: '1', queryName: '1', selected: false},
        {name: '2', queryName: '2', selected: false},
        {name: '3', queryName: '3', selected: false},
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

  loadEngines(restoreHeight: boolean): void {
    let query = 'amount=' + this.enginesOnPage;
    query += '&offset=' + ((this.page - 1) * this.enginesOnPage);
    query += '&' + this.query;
    if (this.orderBy.length > 0) {
      query += '&orderBy=' + this.orderBy;
    }
    this.catalogLoaded = false;
    if (restoreHeight) {
      document.body.scroll(0, this.bodyScroll);
    }
    this.http.get<EnginePreview[]>(endpoint + '/engines/find?' + query).subscribe(
      response => {
        this.catalogLoaded = true;
        this.engines = response;
      }, error => {
        console.clear();
        console.log(error);
        window.setTimeout(() => {
          this.loadEngines(false);
        }, 5000);
      });
  }

  countEngines(): void {
    this.http.get<number>(endpoint + '/engines/count' +
      (this.query.length > 0 ? '?' + this.query : '')).subscribe(
        amount => {
          if (amount >= 0) {
            this.quantity = amount;
            this.totalPages = Math.ceil(amount / this.enginesOnPage);
            if (this.totalPages < this.page) {
              this.page = 1;
              this.loadEngines(false);
            }
          }
        }, () => {
        console.clear();
        window.setTimeout(() => {
          this.countEngines();
        }, 4500);
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
          for (const filter of this.filters) {
            if (filter.name === 'тип') {
              for (const type of response) {
                let found = false;
                for (const option of filter.options) {
                  if (option.queryName === type.name) {
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  filter.options.push({name: type.name, queryName: type.name, selected: false});
                }
              }
            }
          }
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

  loadEngine(name: string): Observable<EngineDetails> {
    return this.http.get<EngineDetails>(endpoint + '/engines/' + name + '?withDetails=true');
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
