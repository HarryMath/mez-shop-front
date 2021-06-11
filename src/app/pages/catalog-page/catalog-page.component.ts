import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../../shared/menu.service';
import {CatalogService} from '../../shared/catalog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterBlock} from '../../shared/models';
import {Location} from '@angular/common';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit, OnDestroy {

  title = 'Все товары';

  constructor(public menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              public catalogService: CatalogService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.clearFilters();
    document.body.scroll(0, this.catalogService.scrollHeight);
    console.log(this.catalogService.scrollHeight);
    for (const param of this.route.snapshot.queryParamMap.keys) {
      for (const filter of this.catalogService.filters) {
        if (filter.queryName === param) { // @ts-ignore
          for (const value of this.route.snapshot.queryParamMap.get(param)?.split(',')) {
            for (const option of filter.options) {
              if (option.queryName === value) {
                option.selected = true;
                break;
              }
            }
          }
          break;
        }
      }
    }
    if (this.route.snapshot.queryParamMap.has('types')) {
      const categoriesParam = this.route.snapshot.queryParamMap.get('types'); // @ts-ignore
      this.title = categoriesParam?.replace(',', ', '); // @ts-ignore
    }
    if (this.route.snapshot.queryParamMap.has('query')) { // @ts-ignore
      this.catalogService.search = this.route.snapshot.queryParamMap.get('query');
      this.title = '"' + this.catalogService.search + '"';
    }
    this.refreshAll();
  }

  ngOnDestroy(): void {
    this.catalogService.scrollHeight = document.body.scrollTop;
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
    this.refreshQuery();
    this.catalogService.countEngines();
    this.catalogService.loadEngines();
  }

  refreshQuery(): void {
    let query = '';
    for (const filterBlock of this.catalogService.filters) {
      let subQuery = '&' + filterBlock.queryName + '=';
      let selectedOptions = 0;
      for (const option of filterBlock.options) {
        if (option.selected) {
          subQuery += option.queryName + ',';
          selectedOptions ++;
        }
      }
      if (selectedOptions > 0) {
        subQuery = subQuery.substring(0, subQuery.length - 1);
        query += subQuery;
      }
    }
    if (this.catalogService.search.length > 0) {
      query += '&query=' + this.catalogService.search;
    }
    this.catalogService.query = query.substring(1, query.length);
    this.location.replaceState('/catalog?' + this.catalogService.query);
  }

  restorePage(): void {
    this.clearFilters();
    this.title = 'Все товары';
    this.catalogService.search = '';
    this.catalogService.page = 1;
    this.catalogService.scrollHeight = 0;
    document.body.scroll(0, 0);
    this.refreshAll();
  }

  clearFilters(): void {
    this.catalogService.filters.forEach(filter => {
      filter.options.forEach(option => {
        option.selected = false;
      });
    });
  }

  switchPage(n: number): void {
    const prev = this.catalogService.page;
    this.catalogService.page = n;
    if (prev !== n) {
      this.catalogService.scrollHeight = 0;
      document.body.scroll(0, 0);
      this.catalogService.loadEngines();
    }
  }
}
