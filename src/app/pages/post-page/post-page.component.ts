import { Component, OnInit } from '@angular/core';
import {NewsService, Post} from '../../shared/news.service';
import {Router} from '@angular/router';
import {ColorService} from '../../shared/color.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  postLoaded = false;
  post: Post = {
    afterPhotoText: '', beforePhotoText: '', date: '', id: 0,
    photo: null, tags: '', title: '', views: 0
  };
  color = 'transparent';
  isLight = false;

  constructor(
    private colorService: ColorService,
    private router: Router,
    private newsService: NewsService) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    this.load();
  }

  load(): void {
    this.postLoaded = false;
    const path = this.router.url.split('/');
    const id = parseInt(path[path.length - 1].split('?')[0], 0);
    this.newsService.loadPost(id)
      .subscribe(response => {
          if (response.date.length > 3) {
            this.post = response;
            this.defineColor();
          } else { // @ts-ignore
            window.message.show('не удается загрузить данные');
            console.warn(response);
          }
        },
        error => { // @ts-ignore
          window.message.show('не удается загрузить данные');
          console.clear();
          console.warn(error);
        });
  }

  defineColor(): void {
    if (this.post.photo === null || this.post.photo.length < 7) {
      this.postLoaded = true;
      return;
    }
    this.colorService.getAverageColor(this.post.photo, 1, color => {
      this.isLight = color.isLight;
      const lightness = this.isLight ? color.hsla.l / 3 : color.hsla.l;
      this.color = `hsl(${color.hsla.h}deg ${color.hsla.s}% ${lightness}% / 66%)`;
      this.postLoaded = true;
    });
  }

  hasPhoto(): boolean {
    return this.post.photo != null && this.post.photo.length > 6;
  }

  getOverlayGradient(): string {
    return 'background: linear-gradient(0deg, ' + this.color + ' 0%, #121b36 95%);';
  }
}
