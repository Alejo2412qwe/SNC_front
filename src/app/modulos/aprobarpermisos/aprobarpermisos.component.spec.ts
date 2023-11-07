import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarpermisosComponent } from './aprobarpermisos.component';

describe('AprobarpermisosComponent', () => {
  let component: AprobarpermisosComponent;
  let fixture: ComponentFixture<AprobarpermisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarpermisosComponent]
    });
    fixture = TestBed.createComponent(AprobarpermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
