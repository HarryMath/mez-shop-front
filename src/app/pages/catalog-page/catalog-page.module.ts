import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {EnginePageComponent} from '../engine-page/engine-page.component';
import {CatalogPageComponent} from './catalog-page.component';
import {EngineComponent} from '../../components/engine/engine.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

const routes = [
  { path: '', component: CatalogPageComponent, pathMatch: 'full' },
  { path: 'general-info', loadChildren: () => import('./general-info/general-info.module').then(m => m.GeneralInfoModule)},
  { path: 'bearings', loadChildren: () => import('./bearings-page/bearings-page.module').then(m => m.BearingsPageModule)},
  { path: 'gearMotors', loadChildren: () => import('./gear-motors-page/gear-motors-page.module').then(m => m.GearMotorsPageModule)},
  { path: 'acoustic', loadChildren: () => import('./acoustic-devices-page/acoustic-devices-page.module')
      .then(m => m.AcousticDevicesPageModule)},
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
