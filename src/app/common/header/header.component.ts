import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../shared/menu.service';
import {AuthorisationService} from '../../shared/authorisation.service';
import {CatalogService} from '../../shared/catalog.service';
import {Router} from '@angular/router';
import {CartService} from '../../shared/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchActive = false;
  query = '';

  constructor(public menuService: MenuService,
              private router: Router,
              public cartService: CartService,
              public catalogService: CatalogService,
              public authService: AuthorisationService) { }

  search(): void {
    this.catalogService.clearFilters();
    this.router.navigate(['/catalog'], {
      queryParams: {query: this.query}
    });
  }

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
