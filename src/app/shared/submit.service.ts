import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SubmitService {

  title = '';
  body = '';
  submitText = '';
  cancelText = '';
  state: 'green'|'danger'|'warning'|'default' = 'default';
  onSubmit: () => void = (() => {});
  isShown = false;
  removing = false;

  constructor() {}

  show(title: string, body: string, submitText: string, cancelText: string,
       state: 'green'|'danger'|'warning'|'default', callback: () => void
  ): void {
    this.title = title;
    this.body = body;
    this.submitText = submitText;
    this.cancelText = cancelText;
    this.state = state;
    this.onSubmit = callback;
    this.isShown = true;
  }

  submit(): void {
    this.onSubmit();
    this.hide();
  }

  getBody(): string {
    let result = '';
    for (const s of this.body.split('\n')) {
      result += '<div>' + s + '</div>';
    }
    return result;
  }

  hide(): void {
    this.removing = true;
    window.setTimeout(() => {
      this.isShown = false;
      this.removing = false;
    }, 300);
  }
}
