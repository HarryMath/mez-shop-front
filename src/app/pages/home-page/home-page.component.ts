import { Component, OnInit } from '@angular/core';
import {CatalogService} from '../../shared/catalog.service';

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
  categoriesLoaded = false;

  constructor(public catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogService.loadCategories().subscribe(() => {
      this.categoriesLoaded = true;
    });
  }

}
