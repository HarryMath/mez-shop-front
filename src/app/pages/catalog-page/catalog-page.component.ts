import {AfterViewInit, Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
export class CatalogPageComponent implements OnInit, OnDestroy, AfterViewInit {

  title = 'Все товары';

  constructor(
    public menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public catalogService: CatalogService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.catalogService.clearFilters();
    document.body.scrollTop = this.catalogService.bodyScroll;
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
      if (this.catalogService.search.length > 1) {
        this.title = '"' + this.catalogService.search + '"';
      }
    }
    this.refreshAll(true);
  }

  ngAfterViewInit(): void {
    document.body.scrollTop = this.catalogService.bodyScroll;
    window.addEventListener('scroll', this.handleScroll, true);
  }

  handleScroll = () => {
    this.catalogService.bodyScroll = document.body.scrollTop;
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  toggleFilterBlock(filter: FilterBlock): void {
    try {
      const filterElement = document.getElementById('f' + filter.name); // @ts-ignore
      if (filter.opened) { // @ts-ignore
        filterElement.style.cssText = 'height: ' + filterElement.offsetHeight + 'px'; // @ts-ignore
        filterElement.setAttribute('openedHeight', filterElement.offsetHeight); // @ts-ignore
        setTimeout(() => { filterElement.style.cssText = ''; }, 5); // @ts-ignore
      } else if (filterElement.getAttribute('openedHeight')) { // @ts-ignore
        filterElement.style.cssText = 'height: ' + filterElement.offsetHeight + 'px';
        setTimeout(() => { // @ts-ignore
            filterElement.style.cssText = 'height: ' + filterElement.getAttribute('openedHeight') + 'px';
          }, 5);
      }
    } catch (ignore) {}
    filter.opened = !filter.opened;
  }

  refreshAll(restoreHeight: boolean): void {
    this.refreshQuery();
    this.catalogService.countEngines();
    this.catalogService.loadEngines(restoreHeight);
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
    query = this.catalogService.query.length > 0 ? '?' + this.catalogService.query : '';
    this.location.replaceState('/catalog' + query);
  }

  restorePage(): void {
    this.catalogService.clearFilters();
    this.title = 'Все товары';
    this.catalogService.search = '';
    this.catalogService.page = 1;
    this.catalogService.bodyScroll = 0;
    document.body.scroll(0, 0);
    console.warn('restore page called');
    this.refreshAll(false);
  }

  switchPage(n: number): void {
    const prev = this.catalogService.page;
    this.catalogService.page = n;
    if (prev !== n) {
      this.catalogService.bodyScroll = 0;
      this.catalogService.loadEngines(true);
    }
  }
}
