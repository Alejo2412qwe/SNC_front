import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamotivopermisoComponent } from './listamotivopermiso.component';

describe('ListamotivopermisoComponent', () => {
  let component: ListamotivopermisoComponent;
  let fixture: ComponentFixture<ListamotivopermisoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListamotivopermisoComponent]
    });
    fixture = TestBed.createComponent(ListamotivopermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
