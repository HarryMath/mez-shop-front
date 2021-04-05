import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class MenuService {

  menuActive = false;
  filterMenuActive = false;
  constructor() { }

  overlayActive(): boolean {
    return this.menuActive || this.filterMenuActive;
  }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  hideFilters(): void {
    this.filterMenuActive = false;
  }

  showFilters(): void {
    this.filterMenuActive = true;
  }

  hideAll(): void {
    this.menuActive ? this.hideMenu() : this.hideFilters();
  }

  hideMenu(): void {
    document.body.scroll(0, 0);
    this.menuActive = false;
  }
}
