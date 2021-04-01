import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Message {
  messageElement: Element;
  interval: any;

  constructor() {
    this.messageElement = document.createElement('div');
    this.messageElement.className = 'msg_window unselectable';
    this.messageElement.innerHTML = `<div class="msg"></div><div class="msg_closer" onclick="hide()">×</div>`;
    document.body.appendChild(this.messageElement);
  }

  show(message: string, status = 0): void {
    // @ts-ignore
    this.messageElement.querySelector('.msg').innerHTML = message;
    if ( status === -1) {
      try {
        window.navigator.vibrate(30);
      } catch (e) {
        console.log(e);
      }
    }
    this.messageElement.classList.add('msg_visible');
    this.interval = window.setInterval((): void => {
      this.hide();
    }, 6000);
  }

  hide(): void {
    clearInterval(this.interval);
    this.messageElement.classList.remove('msg_visible');
  }
}
