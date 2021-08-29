import { Component, OnInit } from '@angular/core';
import {NewsService, PostPreview} from '../../shared/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  constructor(public newsService: NewsService) { }

  posts: PostPreview[] = [];
  loading = true;

  ngOnInit(): void {
    this.reloadNews();
  }

  public reloadNews(): void {
    this.loading = true;
    this.newsService.loadAllPreviews().subscribe(response => {
      this.posts = response;
      this.loading = false;
    }, error => {
      console.clear();
      window.setTimeout(this.reloadNews, 5000);
    });
  }

}
