import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from 'rxjs/operators';

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
  views: number;
}

@Injectable({providedIn: 'root'})
export class NewsService {
  posts: Post[] = [];
  postPreviews: PostPreview[] = [];

  constructor(private http: HttpClient) {}

  load3Previews(): Observable<PostPreview[]> {
    return this.http.get<PostPreview[]>('https://mez-api.herokuapp.com/news?amount=3&offset=0')
      .pipe(
        tap(response => this.postPreviews = response )
      );
  }

  loadAllPreviews(): Observable<PostPreview[]> {
    return this.http.get<PostPreview[]>('https://mez-api.herokuapp.com/news')
      .pipe(
        tap(response => this.postPreviews = response )
      );
  }

  loadAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://mez-api.herokuapp.com/news?withDetails=true')
      .pipe(
        tap(response => this.posts = response )
      );
  }

  loadPost(id: number): Observable<Post> {
    return this.http.get<Post>('https://mez-api.herokuapp.com/news/' + id);
  }
}
