import { Component, OnInit } from '@angular/core';
import {CatalogService} from '../../shared/catalog.service';
import {NewsService} from '../../shared/news.service';
import {CategoryPreview} from '../../shared/models';

export interface Slide {
  title: string;
  photo: string;
  text: string;
  linkName: string;
  linkPath: string;
  class: ''|'s-in-f'|'s-in-b'|'s-out-f'|'s-out-b';
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  additional: CategoryPreview[] = [
    {name: 'Опорно-поворотные устройства', shortDescription: '', photo: '/assets/photos/slewingBearings.png'},
    {name: 'Электроакустические приборы', shortDescription: '', photo: '/assets/photos/electroacousticDevices.png'},
    {name: 'Редуктора и мотор редуктора', shortDescription: '', photo: '/assets/photos/gearMotors.png'},
  ];

  slides: Slide[] = [
    {title: 'Электро-двигатели МЭЗ', class: 's-in-f',
      photo: '/assets/photos/landingImage.png',
      text: 'Если вы ищете замену двигателя или планируете новый проект, найдите свой двигатель с помощью расширенного поиска или свяжитесь с нами любым удобмным вам способом, чтобы убедиться, что вы выбрали двигатель, наиболее подходящий вам.',
      linkName: 'Контакты', linkPath: '/contacts'},
    {title: 'Редуктора и мотор редуктора', class: '',
      photo: '/assets/photos/gearReducers.png',
      text: 'Если вы ищете замену двигателя или планируете новый проект, найдите свой двигатель с помощью расширенного поиска или свяжитесь с нами любым удобмным вам способом, чтобы убедиться, что вы выбрали двигатель, наиболее подходящий вам.',
      linkName: 'Подробнее', linkPath: '/contacts'},
    {title: 'Электро-двигатели МЭЗ', class: '',
      photo: '/assets/photos/parts.png',
      text: 'Если вы ищете замену двигателя или планируете новый проект, найдите свой двигатель с помощью расширенного поиска или свяжитесь с нами любым удобмным вам способом, чтобы убедиться, что вы выбрали двигатель, наиболее подходящий вам.',
      linkName: 'Контакты', linkPath: '/contacts'}
  ];
  activeSlide = 0;
  slideInterval: number | undefined;
  hideInterval: number | undefined;

  newsLoaded = false;

  category = '';
  manufacturer = '';
  efficiency = '';
  frequency = '';
  quantity = -1;
  counting = false;

  constructor(
    public catalogService: CatalogService,
    public newsService: NewsService
  ) {
    this.catalogService.loadManufacturers();
    this.setSlideInterval(7000);
  }

  ngOnInit(): void {
    this.recount();
    this.newsService.load3Previews().subscribe(() => {
      this.newsLoaded = true;
    });
  }

  setSlideInterval(timeout: number): void {
    this.slideInterval = window.setTimeout(() => {
      this.nextSlide(7000);
    }, timeout);
  }

  clearFilters(): void {
    this.category = '';
    this.manufacturer = '';
    this.efficiency = '';
    this.frequency = '';
    this.recount();
  }

  recount(): void {
    let query = '';
    if (this.category.length > 0) {
      query += 'types=' + this.category + '&';
    }
    if (this.manufacturer.length > 0) {
      query += 'manufacturers=' + this.manufacturer + '&';
    }
    if (this.efficiency.length > 0) {
      query += 'efficiency=' + this.efficiency + '&';
    }
    if (this.frequency.length > 0) {
      query += 'frequency=' + this.frequency + '&';
    }
    query = query.substring(0, query.length - 1);
    this.counting = true;
    this.catalogService.getAmount(query).subscribe(response => {
      if (response >= 0) {
        this.quantity = response;
      }
      this.counting = false;
    });
  }

  getParams(): any {
    const params: any = {};
    if (this.category.length > 0) {
      params.types = this.category;
    }
    if (this.manufacturer.length > 0) {
      params.manufacturers = this.manufacturer;
    }
    if (this.efficiency.length > 0) {
      params.efficiency = this.efficiency;
    }
    if (this.frequency.length > 0) {
      params.frequency = this.frequency;
    }
    return params;
  }

  getBtnText(): string {
    return this.quantity >= 0 ?
      'показать ' + this.quantity : 'подобрать';
  }

  prevSlide(timeout: number): void {
    window.clearInterval(this.slideInterval);
    window.clearInterval(this.hideInterval);
    const prevSlide = this.activeSlide;
    this.activeSlide -= 1;
    if (this.activeSlide < 0) {
      this.activeSlide = this.slides.length - 1;
    }
    for (let i = 0; i < this.slides.length; i++) {
      if (i === this.activeSlide) {
        this.slides[i].class = 's-in-b';
      } else if (i === prevSlide) {
        this.slides[i].class = 's-out-b';
      } else {
        this.slides[i].class = '';
      }
    }
    this.setSlideInterval(timeout);
    this.hideInterval = window.setTimeout(() => {
      this.slides[prevSlide].class = '';
    }, 210);
  }

  nextSlide(timeout: number): void {
    window.clearInterval(this.slideInterval);
    window.clearInterval(this.hideInterval);
    const prevSlide = this.activeSlide;
    this.activeSlide += 1;
    if (this.activeSlide >= this.slides.length) {
      this.activeSlide = 0;
    }
    for (let i = 0; i < this.slides.length; i++) {
      if (i === this.activeSlide) {
        this.slides[i].class = 's-in-f';
      } else if (i === prevSlide) {
        this.slides[i].class = 's-out-f';
      } else {
        this.slides[i].class = '';
      }
    }
    this.setSlideInterval(timeout);
    this.hideInterval = window.setTimeout(() => {
      this.slides[prevSlide].class = '';
    }, 210);
  }

}
