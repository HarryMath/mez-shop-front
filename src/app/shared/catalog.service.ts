import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface Engine {
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  photo: string;
  characteristics: Map<string, string>;
}

@Injectable({providedIn: 'root'})
export class CatalogService {
  engines: Engine[] = [];

  constructor(private http: HttpClient) {}

  loadEngines(): Observable<Engine[]> {
    return this.http.get<Engine[]>('https://mez-api.herokuapp.com/engines?amount=24&offset=0&withDetails=true')
      .pipe(
        tap(response => this.engines = response )
      );
  }

}
