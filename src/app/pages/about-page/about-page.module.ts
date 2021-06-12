import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPageComponent } from './about-page.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

const routes = [
  { path: '', component: AboutPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [AboutPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule
    ]
})
export class AboutPageModule { }
