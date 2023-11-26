/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MiAsistenciaComponent } from './miAsistencia.component';

describe('MiAsistenciaComponent', () => {
  let component: MiAsistenciaComponent;
  let fixture: ComponentFixture<MiAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
