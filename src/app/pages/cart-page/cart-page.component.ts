import { Component, OnInit } from '@angular/core';
import {CartService} from '../../shared/cart.service';

@Component({
  selector: 'app-chart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  constructor(public chartService: CartService) { }

  ngOnInit(): void {
  }

}
