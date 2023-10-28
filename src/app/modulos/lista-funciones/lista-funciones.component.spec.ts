import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFuncionesComponent } from './lista-funciones.component';

describe('ListaFuncionesComponent', () => {
  let component: ListaFuncionesComponent;
  let fixture: ComponentFixture<ListaFuncionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaFuncionesComponent]
    });
    fixture = TestBed.createComponent(ListaFuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
