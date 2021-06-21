import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {BearingsPageComponent} from './bearings-page.component';
import {RouterModule} from '@angular/router';


const route = [
  { path: '', component: BearingsPageComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    BearingsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class BearingsPageModule { }
