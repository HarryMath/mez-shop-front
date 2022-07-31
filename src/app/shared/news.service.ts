import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {endpoint} from './request';

export interface Post {
  id: number|null;
  title: string;
  date: string;
  beforePhotoText: string;
  photo: string|null;
  afterPhotoText: string;
  views: number;
  tags: string;
}

export interface PostPreview {
  id: number|null;
  title: string;
  date: string;
  beforePhotoText: string;
  photo: string;
  views: number;
}

@Injectable({providedIn: 'root'})
export class NewsService {
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  load3Previews(): Observable<PostPreview[]> {
    return this.http.get<PostPreview[]>(endpoint + '/news?amount=3&offset=0');
  }

  loadAllPreviews(): Observable<PostPreview[]> {
    return this.http.get<PostPreview[]>(endpoint + '/news');
  }

  loadPost(id: number): Observable<Post> {
    return this.http.get<Post>(endpoint + '/news/' + id + '?increaseViews=true');
  }
}
