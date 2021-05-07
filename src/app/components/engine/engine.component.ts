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

  getPhotoCss(): string {
    if (this.engine.photo === null || this.engine.photo === 'null' || this.engine.photo.length < 5) {
      return '';
    }
    return `background-image: url(${this.engine.photo})`;
  }

  getPower(): string {
    let result = '';
    for (let i = 0; i < this.engine.characteristics.length; i++) {
      result += this.engine.characteristics[i].power;
      if (i !== this.engine.characteristics.length - 1) { result += ', '; }
    }
    return result;
  }

  getFrequency(): string {
    let result = '';
    for (let i = 0; i < this.engine.characteristics.length; i++) {
      result += this.engine.characteristics[i].frequency;
      if (i !== this.engine.characteristics.length - 1) { result += ', '; }
    }
    return result;
  }

  getEfficiency(): string {
    let result = '';
    for (let i = 0; i < this.engine.characteristics.length; i++) {
      result += this.engine.characteristics[i].efficiency;
      if (i !== this.engine.characteristics.length - 1) { result += ',  '; }
    }
    return result;
  }
}
