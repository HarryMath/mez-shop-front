import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInfoComponent } from './general-info.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';

const route = [
  { path: '', component: GeneralInfoComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [GeneralInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedModule
  ]
})
export class GeneralInfoModule { }
