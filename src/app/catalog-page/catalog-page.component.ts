import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/menu.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  constructor(public menuService: MenuService) { }

  ngOnInit(): void {
  }

}
