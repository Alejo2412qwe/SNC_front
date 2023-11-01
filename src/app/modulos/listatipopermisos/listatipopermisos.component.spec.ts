import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListatipopermisosComponent } from './listatipopermisos.component';

describe('ListatipopermisosComponent', () => {
  let component: ListatipopermisosComponent;
  let fixture: ComponentFixture<ListatipopermisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListatipopermisosComponent]
    });
    fixture = TestBed.createComponent(ListatipopermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
