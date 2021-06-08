import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../shared/menu.service';
import {CatalogService} from '../../shared/catalog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterBlock} from '../../shared/models';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  title = 'Все товары';

  constructor(public menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router,
              public catalogService: CatalogService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  toggleFilterBlock(filter: FilterBlock): void {
    try {
      const filterElement = document.getElementById('f' + filter.name); // @ts-ignore
      filterElement.style.cssText = 'height: ' + filterElement.offsetHeight + 'px';
      if (filter.opened) { // @ts-ignore
        filterElement.setAttribute('openedHeight', filterElement.offsetHeight); // @ts-ignore
        setTimeout(() => { filterElement.style.cssText = ''; }, 5); // @ts-ignore
      } else if (filterElement.getAttribute('openedHeight')) {
        setTimeout(() => { // @ts-ignore
            filterElement.style.cssText = 'height: ' + filterElement.getAttribute('openedHeight') + 'px';
          }, 5);
      }
    } catch (e) {
      console.warn(e);
    }
    filter.opened = !filter.opened;
  }

  refreshAll(): void {
    this.catalogService.refreshQuery();
    this.catalogService.countEngines();
    this.catalogService.loadEngines();
  }

  removeFilters(): void {
    this.catalogService.filters.forEach(filter => {
      filter.options.forEach(option => {
        option.selected = false;
      });
    });
    this.title = 'Все товары';
    this.catalogService.search = '';
    this.catalogService.page = 1;
    document.body.scroll(0, 0);
    this.refreshAll();
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.has('c')) {
      const categoriesParam = this.route.snapshot.queryParamMap.get('c'); // @ts-ignore
      this.title = categoriesParam?.replace(',', ', '); // @ts-ignore
      this.updateCategories(categoriesParam.split(','));
    }
    if (this.route.snapshot.queryParamMap.has('q')) { // @ts-ignore
      this.catalogService.search = this.route.snapshot.queryParamMap.get('q');
      this.title = '"' + this.catalogService.search + '"';
    }
    this.refreshAll();
  }

  updateCategories(categories: string[]): void {
    for (const filterBlock of this.catalogService.filters) {
      if (filterBlock.name === 'тип') {
        for (const option of filterBlock.options) {
          for (const category of categories) {
            if (option.name === category) {
              option.selected = true;
              break;
            }
          }
        }
        break;
      }
    }
  }

  switchPage(n: number): void {
    const prev = this.catalogService.page;
    this.catalogService.page = n;
    if (prev !== n) {
      document.body.scroll(0, 0);
      this.catalogService.loadEngines();
    }
  }
}
