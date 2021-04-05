import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EngineComponent } from './engine/engine.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CatalogComponent } from './catalog/catalog.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';

const appRoutes = [
  { path: '', component: HomePageComponent },
  { path: 'catalog', component: CatalogPageComponent, pathMatch: 'full' },
  { path: 'catalog/:id', component: CatalogPageComponent, pathMatch: 'prefix' },
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
    CatalogPageComponent
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
