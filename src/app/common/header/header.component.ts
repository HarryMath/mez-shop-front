import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../shared/menu.service';
import {AuthorisationService} from '../../shared/authorisation.service';
import {CatalogService} from "../../shared/catalog.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchActive = false;

  constructor(public menuService: MenuService,
              public catalogService: CatalogService,
              public authService: AuthorisationService) { }

  focusSearch(): void {
    this.searchActive = true;
  }
  blurSearch(): void {
    this.searchActive = false;
  }

  hideMenu(): void {
    this.menuService.hideMenu();
  }

  hideAll(): void {
    this.menuService.hideAll();
  }

  ngOnInit(): void {
    this.catalogService.loadCategories().subscribe();
  }

}
