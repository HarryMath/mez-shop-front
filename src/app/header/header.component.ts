import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuActive = false;

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
