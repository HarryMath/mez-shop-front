import {Injectable} from '@angular/core';
import {EngineDetails} from './models';
import {endpoint, simpleRequest} from './request';

export interface CartItem {
  photo: string;
  name: string;
  montage: 'лапы'|'комби'|'фланец';
  type: string;
  manufacturer: string;
  price: number;
  amount: number;
}

export interface CartItemDTO {
  itemId: string;
  montage: 'лапы'|'комби'|'фланец';
  price: number;
  amount: number;
}

export interface Order {
  items: CartItemDTO[];
  name: string;
  mail: string;
  phone: string;
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

  async add(item: EngineDetails, amountLapy: number, amountCombi: number, amountFlanets: number): Promise<void> {
    let lapyInCart = false;
    let combiInCart = false;
    let flanetsInCart = false;
    for (const cartItem of this.items) {
      if (cartItem.name === item.name) {
        if (cartItem.montage === 'лапы') {
          lapyInCart = true;
          cartItem.amount += amountLapy;
        } else if (cartItem.montage === 'комби') {
          combiInCart = true;
          cartItem.amount += amountCombi;
        } else if (cartItem.montage === 'фланец') {
          flanetsInCart = true;
          cartItem.amount += amountFlanets;
        }
      }
    }
    if (!lapyInCart && amountLapy > 0) {
      this.items.unshift({name: item.name, montage: 'лапы', photo: item.photo,
        price: item.priceLapy, manufacturer: item.manufacturer, amount: amountLapy, type: item.type.name});
    }
    if (!combiInCart && amountCombi > 0) {
      this.items.unshift({name: item.name, montage: 'комби', photo: item.photo,
        price: item.priceCombi, manufacturer: item.manufacturer, amount: amountCombi, type: item.type.name});
    }
    if (!flanetsInCart && amountFlanets > 0) {
      this.items.unshift({name: item.name, montage: 'фланец', photo: item.photo,
        price: item.priceFlanets, manufacturer: item.manufacturer, amount: amountFlanets, type: item.type.name});
    }
    await this.saveState();
  }

  getFinalPrice(): number {
    let finalPrice = 0;
    for (const item of this.items) {
      finalPrice += item.amount * item.price;
    }
    return finalPrice;
  }

  async saveState(): Promise<void> {
    window.localStorage.setItem('cart', JSON.stringify(this.items));
  }

  async remove(name: string, montage: 'лапы'|'комби'|'фланец'): Promise<void> {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === name && this.items[i].montage === montage) {
        this.items.splice(i, 1);
        break;
      }
    }
    await this.saveState();
  }

  async makeOrder(clientName: string, mail: string, phone: string): Promise<any> {
    const items: CartItemDTO[] = [];
    this.items.forEach(i => {
      items.push({itemId: i.name, montage: i.montage, amount: i.amount, price: i.price});
    });
    const order: Order = {name: clientName, mail, items, phone};
    return simpleRequest(endpoint + '/orders/create', 'POST', order);
  }

  clear(): void {
    this.items = [];
    this.saveState();
  }
}
