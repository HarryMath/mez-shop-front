import {Component, Input, OnInit} from '@angular/core';
import {PostPreview} from '../../shared/news.service';

@Component({
  selector: 'app-post-news',
  templateUrl: './post-news.component.html',
  styleUrls: ['./post-news.component.css']
})
export class PostNewsComponent implements OnInit {

  @Input() post!: PostPreview;

  constructor() { }

  ngOnInit(): void {
  }

  getText(): string {
    return this.post.beforePhotoText.substring(0, 140) + '...';
  }

}
