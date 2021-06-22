import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearMotorsPageComponent } from './gear-motors-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';

const route = [
  { path: '', component: GearMotorsPageComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [GearMotorsPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class GearMotorsPageModule { }
