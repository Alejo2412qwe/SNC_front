import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaperiodosComponent } from './listaperiodos.component';

describe('ListaperiodosComponent', () => {
  let component: ListaperiodosComponent;
  let fixture: ComponentFixture<ListaperiodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaperiodosComponent]
    });
    fixture = TestBed.createComponent(ListaperiodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
