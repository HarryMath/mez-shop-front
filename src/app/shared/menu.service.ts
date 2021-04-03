import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class MenuService {

  menuActive = false;
  constructor() { }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  hideMenu(): void {
    document.body.scroll(0, 0);
    this.menuActive = false;
  }
}
