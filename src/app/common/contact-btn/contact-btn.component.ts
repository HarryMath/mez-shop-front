import { Component, OnInit } from '@angular/core';
import {Feedback} from '../../shared/models';
import {endpoint} from '../../shared/request';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-contact-btn',
  templateUrl: './contact-btn.component.html',
  styleUrls: ['./contact-btn.component.css']
})
export class ContactBtnComponent implements OnInit {

  isShown = false;
  removing = false;
  feedBack: Feedback = {name: '', contact: '', message: ''};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  hide(): void {
    this.removing = true;
    window.setTimeout(() => {
      this.isShown = false;
      this.removing = false;
    }, 300);
  }

  submit(): void {
    const name = this.feedBack.name.trim();
    const contact = this.feedBack.contact.trim();
    const feedBack: Feedback = {contact, message: 'Когда позвонить: ' + this.feedBack.message, name};
    if (name.length > 2) {
      if (contact.length > 4) {
        this.http.post(endpoint + '/feedback', feedBack).subscribe(response => {
          if (response >= 0) { // @ts-ignore
            window.message.show('ваша заявка отправлна');
            this.hide();
          } else { // @ts-ignore
            window.message.show('ваша заявка не отправлена', -1);
          }
        });
      } else {// @ts-ignore
        window.message.show('заполните номер телефона', -1);
      }
    } else { // @ts-ignore
      window.message.show('заполните имя', -1);
    }
  }
}
