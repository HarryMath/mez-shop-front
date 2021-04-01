import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Message} from '../tools/tools.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // @ts-ignore
  nameNode: input;
  // @ts-ignore
  contactNode: input;
  // @ts-ignore
  messageNode: input;

  constructor(private http: HttpClient, private message: Message) { }

  sendFeedback(): void {
    console.log('sending...');
    const name = this.nameNode.value.trim();
    const contact = this.contactNode.value.trim();
    const message = this.messageNode.value.trim();
    console.log(name, contact, message);
    if (name.length > 2) {
      if (contact.length > 4) {
        let requestText = `https://mez-api.herokuapp.com/feedback?name=${name}&contact=${contact}`;
        if (message.length) { requestText += `&message=${message}`; }
        this.http.get(requestText)
          .pipe(
            tap(response => {
              console.log('response: ' + response);
              this.message.show(
                response === 1 ?
                  'ваше сообщение отправлено!' :
                  'сообщение не отправлено :c<br>попробуйте связаться другим способом', -1
              );
            })
          ).subscribe();
      } else {
        this.message.show('введите ваш контакт, чтобы мы могли с вами связаться', -1);
      }
    } else {
      this.message.show('имя слишком короткое', -1);
    }
  }

  ngOnInit(): void {
    this.nameNode = document.getElementById('name');
    this.contactNode = document.getElementById('contact');
    this.messageNode = document.getElementById('message');
  }

}
