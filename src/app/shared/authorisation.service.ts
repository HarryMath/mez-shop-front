import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

declare var google: any;
export interface User {
  id: number|null;
  googleId: string;
  mail: string;
  name: string;
  phone: string|null;
  photo: string|null;
  isAdmin: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthorisationService {

  static user: User = {id: null, googleId: '', mail: '', name: '', photo: null, phone: null, isAdmin: false};
  static isAuthorised = false;

  constructor() {
    const userString = window.localStorage.getItem('user');
    if (userString !== null) {
      try {
        const user = JSON.parse(userString);
        if (user.name) {
          AuthorisationService.user = user;
          AuthorisationService.isAuthorised = true;
          return;
        }
      } catch (e) { console.warn(e); }
    }
    // setTimeout(this.showGoogleOneTapWindow, 4000);
  }

  static handleGoogleResponse(response: object): void {
    // @ts-ignore
    const info = this.parseJwt(response.credential);
    const user = {
      // @ts-ignore
      mail: info.email, googleId: response.clientId, phone: null,
      // @ts-ignore
      name: info.name, photo: info.picture, id: null, isAdmin: false
    };
    AuthorisationService.user = user;
    AuthorisationService.isAuthorised = true;
    window.localStorage.setItem('user', JSON.stringify(user));
    // @ts-ignore
    window.message.show('Вы вошли успешно!', 1);
    try {
      const element = document.getElementById('authButton');
      // @ts-ignore
      const attributeName = element.getAttributeNames()[0];
      // @ts-ignore
      element.className = 'header-top-item user';
      // @ts-ignore
      element.removeAttribute('id');
      // @ts-ignore
      element.innerHTML =
        `<span ${attributeName}>${user.name.split(' ')[0]}</span>
          <div ${attributeName} class="user-image" style="background-image: url(${user.photo})"></div>`;
    } catch (e) {
      console.warn(e);
    }
  }

  private static parseJwt(token: string): JSON {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  isAuthorised(): boolean {
    return AuthorisationService.isAuthorised;
  }

  getUserName(): string {
    return AuthorisationService.user.name;
  }
  getFirstChar(): string {
    return AuthorisationService.user.name.charAt(0);
  }

  getUserImageStyle(): string {
    return AuthorisationService.user.photo != null ?
      `background-image: url(${AuthorisationService.user.photo}); color: transparent` : '';
  }

  showGoogleOneTapWindow(): void {
    if (! ('google' in window)) {
      setTimeout(this.showGoogleOneTapWindow, 1000);
      return;
    }
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      cancel_on_tap_outside: false,
      callback: (response: object) => AuthorisationService.handleGoogleResponse(response)
    });
    google.accounts.id.prompt((notification: any) => {
      console.log(notification);
    });
  }
}
