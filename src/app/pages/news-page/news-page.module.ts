import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsPageComponent} from './news-page.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {PostPageComponent} from '../post-page/post-page.component';
import {PostNewsComponent} from '../../components/post-news/post-news.component';

const routes = [
  {path: '', component: NewsPageComponent, pathMatch: 'full'},
  {path: ':id', component: PostPageComponent, pathMatch: 'prefix'}
];

@NgModule({
  declarations: [NewsPageComponent, PostPageComponent, PostNewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class NewsPageModule {
}
