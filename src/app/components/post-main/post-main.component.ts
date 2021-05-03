import {Component, Input, OnInit} from '@angular/core';
import {PostPreview} from '../../shared/news.service';

@Component({
  selector: 'app-post-main',
  templateUrl: './post-main.component.html',
  styleUrls: ['./post-main.component.css']
})
export class PostMainComponent implements OnInit {

  @Input() post!: PostPreview;

  constructor() { }

  ngOnInit(): void {
  }

  getText(): string {
    return this.post.beforePhotoText.substring(0, 200) + '...';
  }
}
