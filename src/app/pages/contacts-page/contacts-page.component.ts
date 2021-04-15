import { Component, OnInit } from '@angular/core';

export interface Department {
  name: string;
  contacts: Contact[];
}

export interface Contact {
  name: string;
  position: string|null;
  phones: Phone[];
  mails: string[];
}

export interface Phone {
  phone: string;
  label: string;
}

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css']
})
export class ContactsPageComponent implements OnInit {

  departments: Department[] = [
    {name: 'Руководители и специалисты', contacts: [
        {name: 'Евсеенко Дмитрий Анатольевич', position: 'Начальник управления экономики', phones: [
            {phone: '+375 (222) 73-83-26', label: ''}
          ], mails: []},
        {name: 'Черногребель Юрий Михайлович', position: 'Главный инженер', phones: [
            {phone: '+375 (222) 73-84-83', label: ''}, {phone: '+375 (222) 64-79-48', label: ''}
          ], mails: []},
        {name: 'Езепова Людмила Алексеевна', position: 'Секретарь приемной руководителей', phones: [
            {phone: '+375 (222) 74-12-30', label: ''}, {phone: '+375 (222) 64-79-48', label: ''}
          ], mails: []},
        {name: 'Барановский Николай Михайлович', position: 'Заместитель директора по производству', phones: [
            {phone: '+375 (222) 73-83-38', label: ''}
          ], mails: []},
        {name: 'Бутолин Владимир Николаевич', position: 'Заместитель главного инженера по новой технике', phones: [
            {phone: '+375 (222) 73-83-19', label: ''}
          ], mails: []},
        {name: 'Бондарева Татьяна Григорьевна', position: 'Заместитель главного бухгалтера', phones: [
            {phone: '+375 (222) 73-84-06', label: ''}
          ], mails: []},
        {name: 'Разентов Николай Васильевич', position: 'Помощник директора по социальным вопросам', phones: [
            {phone: '+375 (222) 64-89-46', label: ''}
          ], mails: []},
        {name: 'Чайко Алексей Валерьевич', position: 'Главный конструктор', phones: [
            {phone: '+375 (222) 73-83-12', label: ''}
          ], mails: []},
        {name: 'Гомонов Александр Александрович', position: 'Главный технолог', phones: [
            {phone: '+375 (222) 64-79-86', label: ''}
          ], mails: []},
        {name: 'Прудникова Наталья Михайловна', position: 'Начальник производственно-диспетчерского отдела', phones: [
            {phone: '+375 (222) 73-83-22', label: ''}
          ], mails: []}
      ]},

    {name: 'Планово-экономический отдел', contacts: [
        {name: 'Левченко Елена Николаевна', position: 'Начальник планово-экономического отдела', phones: [
            {phone: '+375 (222) 64-90-57', label: ''}, {phone: '+375 (222) 73-90-22', label: ''}
          ], mails: []}
    ]},

    {name: 'Отдел технического контроля', contacts: [
        {name: 'Жаравович Олег Адольфович', position: 'Начальник отдела технического контроля', phones: [
            {phone: '+375 (222) 73-90-09', label: ''}
          ], mails: []},
        {name: 'Бюро технического контроля', position: null, phones: [
            {phone: '+375 (222) 73-83-37', label: ''}
          ], mails: []}
      ]},

    {name: 'Отдел продаж ОАО "Могилевлифтмаш"', contacts: [
        {name: 'Кузьменков Сергей Владимирович', position: 'Начальник отдела продаж электродвигателей', phones: [
            {phone: '+375 (222) 646-851', label: ''}
          ], mails: []},
        {name: 'Бычков Сергей Николаевич', position: 'Начальник отдела рекламы и продаж потребительских товаров', phones: [
            {phone: '+375 (222) 740-822', label: ''}
          ], mails: []},
        {name: 'Бюро продаж потребительских товаров', position: null, phones: [
            {phone: '+375 (222) 740-890', label: ''}
          ], mails: ['reklama@liftmach.by']},
        {name: 'Бюро продаж электродвигателей', position: null, phones: [
            {phone: '+375 (222) 649-980', label: '(РФ)'},
            {phone: '+375 (222) 739-013', label: '(РФ)'},
            {phone: '+375 (222) 738-460', label: '(РБ)'},
            {phone: '+375 (222) 649-370', label: '(РБ)'},
            {phone: '+375 (222) 738-328', label: '(зарубежье)'}
          ], mails: ['motor@liftmach.by']}
      ]},

    {name: 'Отдел сбыта ОАО "Могилевлифтмаш"', contacts: [
        {name: 'Серов Андрей Евгеньевич', position: 'Заместитель начальника отдела сбыта', phones: [
            {phone: '+375 (222) 73-83-30', label: ''}, {phone: '+375 (222) 73-83-31', label: ''}
          ], mails: []},
        {name: 'Отдел сбыта электродвигателей', position: null, phones: [
            {phone: '+375 (222) 73-83-30', label: ''}, {phone: '+375 (222) 73-83-31', label: ''}
          ], mails: []}
      ]},

    {name: 'Отдел кадров ОАО "Могилевлифтмаш"', contacts: [
        {name: 'Волкова Раиса Васильевна', position: 'Начальник отдела кадров и технического обучения', phones: [
            {phone: '+375 (222) 74-08-92', label: ''}
          ], mails: []}
      ]}
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
