import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {PreloadAllModules, RouterModule} from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoryComponent } from './components/category/category.component';
import { PostMainComponent } from './components/post-main/post-main.component';
import { EnginePageComponent } from './pages/engine-page/engine-page.component';
import {SharedModule} from './shared/shared.module';

const appRoutes = [
  { path: '', component: HomePageComponent },
  { path: 'catalog', loadChildren: () => import('./pages/catalog-page/catalog-page.module').then(m => m.CatalogPageModule)},
  { path: 'contacts', loadChildren: () => import('./pages/contacts-page/contacts-page.module').then(m => m.ContactsPageModule)},
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    CategoryComponent,
    PostMainComponent,
    EnginePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
