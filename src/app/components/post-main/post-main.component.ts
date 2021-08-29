import {Component, Input, OnInit} from '@angular/core';
import {PostPreview} from '../../shared/news.service';
import {ColorService} from '../../shared/color.service';

@Component({
  selector: 'app-post-main',
  templateUrl: './post-main.component.html',
  styleUrls: ['./post-main.component.css']
})
export class PostMainComponent implements OnInit {

  @Input() post!: PostPreview;
  color = '#fff';
  isLight = true;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    if (this.post.photo == null || this.post.photo.length < 6) {
      this.post.photo = '/assets/photo.png';
    } else {
      this.colorService.getAverageColor(this.post.photo, 0.9, color => {
        this.isLight = color.isLight;
        this.color = `hsl(${color.hsla.h}deg ${color.hsla.s}% ${color.hsla.l}% / 90%)`;
      });
    }
  }

  getText(): string {
    return this.post.beforePhotoText.substring(0, 70) + '...';
  }

  getCssPhoto(): string {
    return this.post.photo !== null && this.post.photo.length > 5 ?
      'background-image: url(' + this.post.photo + ')' : '';
  }

  getOverlayStyle(): string {
    let style = 'background: linear-gradient(0deg, ' + this.color + ' 30%, transparent 60%, transparent 100%);';
    if (!this.isLight) {
      style += 'box-shadow: inset 0 0 20px ' + this.color;
    }
    return style;
  }

  getDescriptionStyle(): string {
    return `background: linear-gradient(0deg, ${this.color} 0%, transparent 100%)`;
  }
}
