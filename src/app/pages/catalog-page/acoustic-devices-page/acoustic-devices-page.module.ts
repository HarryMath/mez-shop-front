import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcousticDevicesPageComponent } from './acoustic-devices-page.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

const route = [
  { path: '', component: AcousticDevicesPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [AcousticDevicesPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedModule
  ]
})
export class AcousticDevicesPageModule { }
