import {Injectable} from '@angular/core';
import {EngineDetails} from './models';
import {endpoint, simpleRequest} from './request';

export interface CartItem {
  item: EngineDetails;
  amount: number;
}

export interface CartItemDTO {
  itemId: string;
  amount: number;
}

export interface Order {
  items: CartItemDTO[];
  name: string;
  mail: string;
}

@Injectable({providedIn: 'root'})
export class CartService {

  items: CartItem[] = [];
  loading = false;

  constructor() {
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
      if (cartItem.item.name === item.name) {
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
      finalPrice += item.amount * item.item.priceLapy;
    }
    return finalPrice;
  }

  async saveState(): Promise<void> {
    window.localStorage.setItem('cart', JSON.stringify(this.items));
  }

  async remove(name: string): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].item.name === name) {
        this.items.splice(i, 1);
        break;
      }
    }
    await this.saveState();
  }

  async makeOrder(clientName: string, mail: string, phone: string): Promise<any> {
    const items: CartItemDTO[] = [];
    this.items.forEach(i => {
      items.push({itemId: i.item.name, amount: i.amount});
    });
    const order: Order = {name: clientName, mail, items};
    return simpleRequest(endpoint + '/orders/create', 'POST', order);
  }

  clear(): void {
    this.items = [];
    this.saveState();
  }
}
