import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {CartPageComponent} from './cart-page.component';
import {FormsModule} from '@angular/forms';

const routes = [
  { path: '', component: CartPageComponent, pathMatch: 'full' },
];


@NgModule({
  declarations: [CartPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule
    ]
})
export class CartPageModule { }
