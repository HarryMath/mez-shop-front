import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {endpoint} from '../../shared/request';
import {AuthorisationService} from '../../shared/authorisation.service';

export interface FeedBack {
  name: string;
  contact: string;
  message: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedBack: FeedBack = {name: '', contact: '', message: ''};

  constructor(private http: HttpClient) { }

  sendFeedback(): void {
    const name = this.feedBack.name.trim();
    const contact = this.feedBack.contact.trim();
    if (name.length > 2) {
      if (contact.length > 4) {
        this.http.post(endpoint + '/feedback', this.feedBack).subscribe(response => {// @ts-ignore
          window.message.show(response === 1 ?
            'ваше сообщение отправлено!' :
            'сообщение не отправлено :c<br>попробуйте связаться другим способом', -1
          );
        });
      } else {// @ts-ignore
        window.message.show('введите ваш контакт, чтобы мы могли с вами связаться', -1);
      }
    } else { // @ts-ignore
      window.message.show('заполните имя', -1);
    }
  }

  ngOnInit(): void {
    if (AuthorisationService.isAuthorised) {
      this.feedBack.contact = AuthorisationService.user.mail;
      this.feedBack.name = AuthorisationService.user.name;
    }
  }

}
