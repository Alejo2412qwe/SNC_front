import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamispermisosComponent } from './listamispermisos.component';

describe('ListamispermisosComponent', () => {
  let component: ListamispermisosComponent;
  let fixture: ComponentFixture<ListamispermisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListamispermisosComponent]
    });
    fixture = TestBed.createComponent(ListamispermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
