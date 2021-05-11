import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {EnginePageComponent} from '../engine-page/engine-page.component';
import {CatalogPageComponent} from './catalog-page.component';
import {EngineComponent} from '../../components/engine/engine.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";

const routes = [
  { path: '', component: CatalogPageComponent, pathMatch: 'full' },
  { path: ':id', component: EnginePageComponent, pathMatch: 'prefix' }
];

@NgModule({
  declarations: [
    CatalogPageComponent,
    EngineComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ]
})
export class CatalogPageModule { }
