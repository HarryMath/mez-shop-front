import {Component, Input, OnInit} from '@angular/core';
import {EnginePreview} from '../../shared/catalog.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css']
})
export class EngineComponent implements OnInit {

  @Input() engine!: EnginePreview;

  constructor() { }

  ngOnInit(): void { }

}
