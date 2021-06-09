import { Component, OnInit } from '@angular/core';
import {CatalogService} from '../../shared/catalog.service';
import {NewsService} from '../../shared/news.service';

export interface EngineTypeDTO {
  name: string;
  photo: string|null;
  shortDescription: string;
  amount: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  newsLoaded = false;

  category = '';
  manufacturer = '';
  efficiency = '';
  frequency = '';
  quantity = -1;
  counting = false;

  constructor(
    public catalogService: CatalogService,
    public newsService: NewsService
  ) {
    this.catalogService.loadManufacturers();
  }

  ngOnInit(): void {
    this.recount();
    this.newsService.load3Previews().subscribe(() => {
      this.newsLoaded = true;
    });
  }

  recount(): void {
    let query = '';
    if (this.category.length > 0) {
      query += 'types=' + this.category + '&';
    }
    if (this.manufacturer.length > 0) {
      query += 'manufacturers=' + this.manufacturer + '&';
    }
    if (this.efficiency.length > 0) {
      query += 'efficiency=' + this.efficiency + '&';
    }
    if (this.frequency.length > 0) {
      query += 'frequency=' + this.frequency + '&';
    }
    query = query.substring(0, query.length - 1);
    this.counting = true;
    this.catalogService.getAmount(query).subscribe(response => {
      if (response >= 0) {
        this.quantity = response;
      }
      this.counting = false;
    });
  }

  getParams(): any {
    const params: any = {};
    if (this.category.length > 0) {
      params.types = this.category;
    }
    if (this.manufacturer.length > 0) {
      params.manufacturers = this.manufacturer;
    }
    if (this.efficiency.length > 0) {
      params.efficiency = this.efficiency;
    }
    if (this.frequency.length > 0) {
      params.frequency = this.frequency;
    }
    return params;
  }

  getBtnText(): string {
    return this.quantity >= 0 ?
      'показать ' + this.quantity : 'подобрать';
  }
}
