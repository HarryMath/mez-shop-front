import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ContactsPageComponent} from './contacts-page.component';
import {DepartmentComponent} from '../../components/department/department.component';

const routes = [
  { path: '', component: ContactsPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ContactsPageComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ContactsPageModule { }
