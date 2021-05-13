import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInfoComponent } from './general-info.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';

const routes = [
  { path: '', component: GeneralInfoComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [GeneralInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class GeneralInfoModule { }
