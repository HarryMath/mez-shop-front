import { Component, OnInit } from '@angular/core';
import {SubmitService} from '../../shared/submit.service';

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: []
})
export class SubmitModalComponent implements OnInit {

  constructor(public modalService: SubmitService) { }

  ngOnInit(): void {
  }

}
