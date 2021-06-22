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
    {name: 'Опорно-поворотные устройства', linkName: 'bearings', shortDescription: '', photo: '/assets/photos/slewingBearings.png'},
    {name: 'Электроакустические приборы', linkName: 'acoustic', shortDescription: '', photo: '/assets/photos/electroacousticDevices.png'},
    {name: 'Редуктора и мотор редуктора', linkName: 'gearMotors', shortDescription: '', photo: '/assets/photos/gearMotors.png'},
  ];

  slides: Slide[] = [
    {title: 'Электро-двигатели МЭЗ', class: 's-in-f',
      photo: '/assets/photos/landingImages/engine.png',
      text: 'Если вы ищете замену двигателя или планируете новый проект, найдите свой двигатель с помощью расширенного поиска или свяжитесь с нами любым удобмным вам способом, чтобы убедиться, что вы выбрали двигатель, наиболее подходящий вам.',
      linkName: 'Контакты', linkPath: '/contacts'},
    {title: 'Редуктора и мотор редуктора', class: '',
      photo: '/assets/photos/landingImages/gearReducers.png',
      text: 'Наши мотор-редуктора имеют универсальные присоединительные размеры и агрегатированы с электродвигателями любых производителей по желанию, что позволяет менять вышедший из строя агрегат на наш без переделывания конструкции готового изделия. ',
      linkName: 'Подробнее', linkPath: '/catalog/gearMotors'},
    {title: 'Электро-двигатели МЭЗ', class: '',
      photo: '/assets/photos/landingImages/parts.png',
      text: 'Если вы ищете замену двигателя или планируете новый проект, найдите свой двигатель с помощью расширенного поиска или свяжитесь с нами любым удобмным вам способом, чтобы убедиться, что вы выбрали двигатель, наиболее подходящий вам.',
      linkName: 'Контакты', linkPath: '/contacts'}
  ];
  activeSlide = 0;
  slideInterval: number | undefined;
  hideInterval: number | undefined;
  private swipeCoords: [number, number] = [0, 0];
  private swipeTime = 0;

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

  slideTo(j: number): void {
    window.clearInterval(this.slideInterval);
    window.clearInterval(this.hideInterval);
    if (j !== this.activeSlide) {
      const prevSlide = this.activeSlide;
      this.activeSlide = j;
      for (let i = 0; i < this.slides.length; i++) {
        if (i === this.activeSlide) {
          this.slides[i].class = 's-in-f';
        } else if (i === prevSlide) {
          this.slides[i].class = 's-out-f';
        } else {
          this.slides[i].class = '';
        }
      }
      this.hideInterval = window.setTimeout(() => {
        this.slides[prevSlide].class = '';
      }, 210);
    }
    this.setSlideInterval(13000);
  }

  swipe(e: TouchEvent, type: 'start'|'end'): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();
    if (type === 'start') {
      this.swipeCoords = coord;
      this.swipeTime = time;
    } else {
      const direction = [coord[0] - this.swipeCoords[0], coord[1] - this.swipeCoords[1]];
      const duration = time - this.swipeTime;
      if (duration < 1500
        && Math.abs(direction[0] / duration * 1000) > 30 // pixels per second > 30
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // horizontal
        direction[0] < 0 ? this.nextSlide(13000) : this.prevSlide(13000);
      }
    }
  }
}
