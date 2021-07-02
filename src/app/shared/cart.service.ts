import {Injectable} from '@angular/core';
import {EngineDetails} from './models';
import {HttpClient} from '@angular/common/http';

export interface CartItem {
  item: EngineDetails;
  amount: number;
}

@Injectable({providedIn: 'root'})
export class CartService {

  items: CartItem[] = [];
  loading = false;

  constructor(private http: HttpClient) {
    const itemsString = window.localStorage.getItem('cart');
    if (itemsString !== null) {
      try {
        const items = JSON.parse(itemsString);
        if (items.length > 0) {
          this.items = items;
          return;
        }
      } catch (ignore) { }
    }}

  async add(item: EngineDetails, amount: number): Promise<void> {
    let alreadyInCart = false;
    for (const cartItem of this.items) {
      if (cartItem.item.id === item.id) {
        cartItem.amount += amount;
        alreadyInCart = true;
        break;
      }
    }
    if (!alreadyInCart) {
      this.items.unshift({item, amount});
    }
    await this.saveState();
  }

  getFinalPrice(): number {
    let finalPrice = 0;
    for (const item of this.items) {
      finalPrice += item.amount * item.item.price;
    }
    return finalPrice;
  }

  async saveState(): Promise<void> {
    window.localStorage.setItem('cart', JSON.stringify(this.items));
  }

  async remove(id: number): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].item.id === id) {
        this.items.splice(i, 1);
        break;
      }
    }
    await this.saveState();
  }
}
