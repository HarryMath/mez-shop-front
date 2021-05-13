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

  constructor(
    public catalogService: CatalogService,
    public newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.load3Previews().subscribe(() => {
      this.newsLoaded = true;
    });
  }

}
