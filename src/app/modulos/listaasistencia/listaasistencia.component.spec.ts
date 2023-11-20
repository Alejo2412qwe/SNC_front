import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaasistenciaComponent } from './listaasistencia.component';

describe('ListaasistenciaComponent', () => {
  let component: ListaasistenciaComponent;
  let fixture: ComponentFixture<ListaasistenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaasistenciaComponent]
    });
    fixture = TestBed.createComponent(ListaasistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
