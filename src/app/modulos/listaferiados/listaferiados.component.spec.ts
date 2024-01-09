import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaferiadosComponent } from './listaferiados.component';

describe('ListaferiadosComponent', () => {
  let component: ListaferiadosComponent;
  let fixture: ComponentFixture<ListaferiadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaferiadosComponent]
    });
    fixture = TestBed.createComponent(ListaferiadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
