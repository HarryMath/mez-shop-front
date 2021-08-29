import { Component, OnInit } from '@angular/core';
import {CartItem, CartService} from '../../shared/cart.service';
import {SubmitService} from '../../shared/submit.service';
import {AuthorisationService} from '../../shared/authorisation.service';

@Component({
  selector: 'app-chart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  name = '';
  mail = '';
  phone = '';
  dialogShown = false;
  closingDialog = false;
  orderProcessing = false;
  success = false;

  constructor(public chartService: CartService, private submitService: SubmitService) {
    const user = AuthorisationService.user;
    if (user.name.length > 0) {
      this.name = user.name;
      this.mail = user.mail;
      this.phone = user.phone !== null ? user.phone : '';
    }
  }

  ngOnInit(): void { }

  less(item: CartItem): void {
    if (item.amount > 1) {
      item.amount--;
      this.chartService.saveState();
    } else if (item.amount === 1) {
      this.submitService.show(
        'удаление ' + item.name,
        'вы уверенны, что хотите убрать двигатель ' + item.name + '(' + item.montage + ') из корзины?',
        'убрать', 'отмена', 'danger',
        () => {
          this.chartService.remove(item.name, item.montage);
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

  makeOrder(): void {
    if (this.chartService.items.length > 0) {
      this.dialogShown = true;
    }
  }

  hideDialog(): void {
    if (!this.orderProcessing) {
      this.closingDialog = true;
      window.setTimeout(() => {
        this.dialogShown = false;
        this.closingDialog = false;
      }, 300);
    }
  }

  submitOrder(): void {
    this.orderProcessing = true;
    this.chartService.makeOrder(this.name, this.mail, this.phone)
      .then(reponse => {
        if (reponse === 'SUCCESS') {
          this.success = true;
          this.orderProcessing = false; // @ts-ignore
          window.message.show('Заказ оформлен, проверите вашу почту ' + this.mail);
          window.setTimeout(() => { this.hideDialog(); }, 100);
          this.chartService.clear();
        } else {
          this.orderProcessing = false;
          console.error(reponse); // @ts-ignore
          window.message.show('не удалось оформить заказ, свяжитесь с нами напрямую');
        }
      });
  }
}
