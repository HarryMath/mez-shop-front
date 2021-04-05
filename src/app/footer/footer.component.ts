import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  name = new FormControl('');
  contact = new FormControl('');
  message = new FormControl('');

  constructor(private http: HttpClient) { }

  sendFeedback(): void {
    const name = this.name.value.trim();
    const contact = this.contact.value.trim();
    const message = this.message.value.trim();
    if (name.length > 2) {
      if (contact.length > 4) {
        let requestText = `https://mez-api.herokuapp.com/feedback?name=${name}&contact=${contact}`;
        if (message.length) { requestText += `&message=${message}`; }
        this.http.get(requestText)
          .pipe(
            tap(response => {
              // @ts-ignore
              window.message.show(response === 1 ?
                'ваше сообщение отправлено!' :
                'сообщение не отправлено :c<br>попробуйте связаться другим способом', -1
              );
            })
          ).subscribe();
      } else {
        // @ts-ignore
        window.message.show('введите ваш контакт, чтобы мы могли с вами связаться', -1);
      }
    } else {
      // @ts-ignore
      window.message.show('имя слишком короткое', -1);
    }
  }

  ngOnInit(): void {}

}
