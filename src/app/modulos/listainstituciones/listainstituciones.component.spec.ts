import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListainstitucionesComponent } from './listainstituciones.component';

describe('ListainstitucionesComponent', () => {
  let component: ListainstitucionesComponent;
  let fixture: ComponentFixture<ListainstitucionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListainstitucionesComponent]
    });
    fixture = TestBed.createComponent(ListainstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
