import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ContactsPageComponent} from './contacts-page.component';
import {OfficeComponent} from '../../components/department/office.component';
import {SharedModule} from '../../shared/shared.module';
import {SafePipe} from './safe.pipe';

const routes = [
  { path: '', component: ContactsPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ContactsPageComponent,
    OfficeComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ContactsPageModule { }
