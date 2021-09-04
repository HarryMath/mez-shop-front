import {Component, OnInit} from '@angular/core';

export interface Place {
  name: string;
  address: string;
  googleId: string;
  expanded: boolean;
}

export interface Office {
  name: string;
  places: Place[];
  phones: string[];
  mails: string[];
}

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent implements OnInit {

  offices: Office[] = [{
    name: 'Офис в Москве',
    places: [
      {name: 'Офис', expanded: false, googleId: 'ChIJs8cyMn5MtUYRAkiFA9Qs6AI',
        address: '119331, г. Москва, проспект Вернадского, дом 29, офис 19-04'},
      {name: 'Склад', googleId: 'ChIJTx7ZwpDUtEYRHBOEc2gVFW0', expanded: false,
        address: 'МО, Ленинский район п.Петровское д. 111'}
      ],
    phones: ['+7 (495) 558-10-83'],
    mails: ['ooo.npo.mez@gmail.com']
  }, {
    name: 'Офис во Владимире',
    places: [
      {name: 'Офис-склад', address: 'г. Владимир, 16 лет Октября, д. 33А, офис 27', expanded: false,
        googleId: 'EkxVbGl0c2EgMTYgTGV0IE9rdHlhYnJ5YSwgMzMsIFZsYWRpbWlyLCBWbGFkaW1pcnNrYXlhIG9ibGFzdCcsIFJ1c3NpYSwgNjAwMDA3IlASTgo0CjIJg7rc_Zh7TEERs4YLQg2GMj4aHgsQ7sHuoQEaFAoSCeWdrCwVeUxBEdaucVqIFwkFDBAhKhQKEgk_88xXmHtMQRG7xR6-Ju8uxw'}
    ],
    phones: ['+7 (963) 787-45-76'],
    mails: ['ooo.npo.mez@mail.ru']
  }];

  constructor() {}

  ngOnInit(): void {
    document.body.scrollTop = 0;
  }

}
