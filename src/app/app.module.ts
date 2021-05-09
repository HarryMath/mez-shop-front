import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoryComponent } from './components/category/category.component';
import { PostMainComponent } from './components/post-main/post-main.component';
import { MapComponent } from './common/map/map.component';
import { EnginePageComponent } from './pages/engine-page/engine-page.component';

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
    MapComponent,
    EnginePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


/* __ APP routong modeule */
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
//
// const routes: Routes = [];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
