import {Component, Input, OnInit} from '@angular/core';
import {Engine} from '../shared/catalog.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css']
})
export class EngineComponent implements OnInit {

  @Input() engine!: Engine;

  constructor() { }

  ngOnInit(): void {
    console.count('engine initialized');
  }

}
