import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnginePageComponent} from './engine-page.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('EnginePageComponent', () => {
  let component: EnginePageComponent;
  let fixture: ComponentFixture<EnginePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler],
      declarations: [EnginePageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnginePageComponent);
    component = fixture.componentInstance;
    console.log(fixture);
    console.log(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
