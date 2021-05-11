import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ContactsPageComponent} from './contacts-page.component';
import {DepartmentComponent} from '../../components/department/department.component';
import {SharedModule} from "../../shared/shared.module";

const routes = [
  { path: '', component: ContactsPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ContactsPageComponent,
    DepartmentComponent
  ],
  exports: [
    ContactsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ContactsPageModule { }
