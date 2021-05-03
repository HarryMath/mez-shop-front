import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { EngineComponent } from './components/engine/engine.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CategoryComponent } from './components/category/category.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { DepartmentComponent } from './components/department/department.component';
import { PostMainComponent } from './components/post-main/post-main.component';
import { MapComponent } from './common/map/map.component';
import { EnginePageComponent } from './pages/engine-page/engine-page.component';

const appRoutes = [
  { path: '', component: HomePageComponent },
  { path: 'catalog', component: CatalogPageComponent, pathMatch: 'full' },
  { path: 'catalog/:id', component: EnginePageComponent, pathMatch: 'prefix' },
  { path: 'contacts', component: ContactsPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EngineComponent,
    CatalogComponent,
    HomePageComponent,
    CatalogPageComponent,
    CategoryComponent,
    ContactsPageComponent,
    DepartmentComponent,
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
