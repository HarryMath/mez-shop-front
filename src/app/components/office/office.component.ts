import {Component, Input, OnInit} from '@angular/core';
import {Office, Place} from '../../pages/contacts-page/contacts-page.component';
import {SafePipe} from '../../pages/contacts-page/safe.pipe';


@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  @Input() office!: Office;
  opened = false;

  constructor() { }

  ngOnInit(): void {
    if (this.office.name === 'Офис в Москве') {
      this.opened = true;
    }
  }

  getStateString(): string {
    return this.opened ? 'свернуть' : 'раскрыть';
  }

  getMap(place: Place): string {
    return 'https://www.google.com/maps/embed/v1/place?key=' + SafePipe.mapsApiKey
      + '&q=place_id:' + place.googleId + '&language=ru';
  }

}
