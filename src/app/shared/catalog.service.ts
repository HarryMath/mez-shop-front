import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
  categories: CategoryPreview[] = [];

  constructor(private http: HttpClient) {}

  loadEngines(): Observable<EnginePreview[]> {
    return this.http.get<EnginePreview[]>('https://mez-api.herokuapp.com/engines?amount=24&offset=0')
      .pipe(
        tap(response => this.engines = response )
      );
  }

  loadCategories(): Observable<CategoryPreview[]> {
    return this.http.get<CategoryPreview[]>('https://mez-api.herokuapp.com/categories?withDetails=false')
      .pipe(
        tap(response => this.categories = response )
      );
  }

}
