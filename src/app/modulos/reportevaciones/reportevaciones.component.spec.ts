import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesComponent } from './reportevaciones.component';

describe('ReportevacionesComponent', () => {
  let component: VacacionesComponent;
  let fixture: ComponentFixture<VacacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacacionesComponent]
    });
    fixture = TestBed.createComponent(VacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
