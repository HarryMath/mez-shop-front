import { Component, OnInit } from '@angular/core';
import {CatalogService} from '../shared/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalogLoaded = false;

  constructor(public catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogService.loadEngines().subscribe(() => {
      this.catalogLoaded = true;
    });
  }

}
