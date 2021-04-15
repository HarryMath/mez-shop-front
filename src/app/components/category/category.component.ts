import {Component, Input, OnInit} from '@angular/core';
import {CategoryPreview} from '../../shared/catalog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category!: CategoryPreview;

  constructor() { }

  getPhoto(): string {
    return this.category.photo == null ?
      '/assets/noImage.png' :
      this.category.photo;
  }

  ngOnInit(): void {
  }

}