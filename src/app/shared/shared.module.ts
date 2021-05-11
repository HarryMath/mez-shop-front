import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedbackComponent} from '../common/feedback/feedback.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MapComponent} from '../common/map/map.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    MapComponent,
    FeedbackComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FeedbackComponent,
    MapComponent
  ]
})
export class SharedModule { }
