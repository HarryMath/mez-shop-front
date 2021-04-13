import { Component, OnInit } from '@angular/core';

export interface EngineTypeDTO {
  name: string;
  photo: string|null;
  shortDescription: string;
  amount: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
