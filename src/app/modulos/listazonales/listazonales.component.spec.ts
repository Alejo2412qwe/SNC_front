import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListazonalesComponent } from './listazonales.component';

describe('ListazonalesComponent', () => {
  let component: ListazonalesComponent;
  let fixture: ComponentFixture<ListazonalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListazonalesComponent]
    });
    fixture = TestBed.createComponent(ListazonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
