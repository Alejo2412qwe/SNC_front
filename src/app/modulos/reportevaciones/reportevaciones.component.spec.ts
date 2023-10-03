import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportevacionesComponent } from './reportevaciones.component';

describe('ReportevacionesComponent', () => {
  let component: ReportevacionesComponent;
  let fixture: ComponentFixture<ReportevacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportevacionesComponent]
    });
    fixture = TestBed.createComponent(ReportevacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
