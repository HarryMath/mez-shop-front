import {Component, OnInit} from '@angular/core';
import {MenuService} from '../shared/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchActive = false;

  constructor(public headerService: MenuService) { }

  toggleMenu(): void {
    this.headerService.toggleMenu();
  }

  focusSearch(): void {
    this.searchActive = true;
  }
  blurSearch(): void {
    this.searchActive = false;
  }

  hideMenu(): void {
    this.headerService.hideMenu();
  }

  ngOnInit(): void {
  }

}
