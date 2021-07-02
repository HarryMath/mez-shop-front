import { Component, OnInit } from '@angular/core';
import {CartItem, CartService} from '../../shared/cart.service';
import {SubmitService} from '../../shared/submit.service';

@Component({
  selector: 'app-chart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  constructor(public chartService: CartService, private submitService: SubmitService) { }

  ngOnInit(): void {
  }

  less(item: CartItem): void {
    if (item.amount > 1) {
      item.amount--;
      this.chartService.saveState();
    } else if (item.amount === 1) {
      this.submitService.show(
        'удаление ' + item.item.name,
        'вы уверенны, что хотите убрать двигатель ' + item.item.name + ' из корзины?',
        'убрать', 'отмена', 'danger',
        () => { // @ts-ignore
          this.chartService.remove(item.item.id);
        }
      );
    }
  }

  more(item: CartItem): void {
    item.amount++;
    this.chartService.saveState();
  }

  getPhotoStyle(photo: string): string {
    return (photo && photo.length > 4) ?
      'background-image: url(' + photo + ')' : '';
  }

  getFinalPrice(): number {
    return this.chartService.getFinalPrice();
  }

  submit(): void {
    return;
  }
}
