import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {endpoint} from './request';

export interface Category {
  name: string;
  photo: string|null;
  shortDescription: string;
  fullDescription: string;
}

export interface CategoryPreview {
  name: string;
  photo: string|null;
  shortDescription: string;
}

export interface EnginePreview {
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  mass: number;
  photo: string;
  characteristics: Characteristics[];
}

export interface EngineDetails {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  mass: number;
  photo: string;
  type: Category;
  characteristics: Characteristics[];
  photos: string[];
}

export interface Characteristics {
  engineId: number;
  power: number;
  frequency: number;
  efficiency: number;
  cosFi: number;
  electricityNominal220: number;
  electricityNominal380: number;
  electricityRatio: number;
  momentsRatio: number;
  momentsMaxRatio: number;
  momentsMinRatio: number;
}

@Injectable({providedIn: 'root'})
export class CatalogService {
  engines: EnginePreview[] = [];
  categories: CategoryPreview[] = [
    {name: '4BP', photo: '/assets/photo.png', shortDescription: 'Взрывозащищенные двигатели серии 4ВР'},
    {name: 'АИР', photo: '/assets/photo.png', shortDescription: 'Электродвигатели общепромышленного назначения'},
    {name: 'АИРС', photo: '/assets/photo.png', shortDescription: 'Двигатели с повышенным скольжением'},
    {name: 'Электродвигатели CENELEC (AIS)', photo: '/assets/photo.png', shortDescription: 'Двигатели асинхронные серии АIS'},
  ];

  constructor(private http: HttpClient) {}

  loadEngines(filters: string): Observable<EnginePreview[]> {
    return this.http.get<EnginePreview[]>(
      endpoint + '/engines?amount=24&offset=0' +
      (filters.length > 0 ? '&' + filters : '')
    ).pipe(tap(response => this.engines = response ));
  }

  countEngines(filters: string): Observable<number> {
    return this.http.get<number>(
      endpoint + '/engines/count' +
      (filters.length > 0 ? '?' + filters : '')
    );
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
