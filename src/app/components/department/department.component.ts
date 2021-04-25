import {Component, Input, OnInit} from '@angular/core';
import {Department} from '../../pages/contacts-page/contacts-page.component';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  @Input() department!: Department;
  opened = false;

  constructor() { }

  getStateString(): string {
    return this.opened ? 'свернуть' : 'раскрыть';
  }

  ngOnInit(): void {
    if (this.department.name === 'Отдел сбыта ОАО "Могилевлифтмаш"') {
      this.opened = true;
    }
  }

}
