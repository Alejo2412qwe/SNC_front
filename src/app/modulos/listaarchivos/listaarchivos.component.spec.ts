import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaarchivosComponent } from './listaarchivos.component';

describe('ListaarchivosComponent', () => {
  let component: ListaarchivosComponent;
  let fixture: ComponentFixture<ListaarchivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaarchivosComponent]
    });
    fixture = TestBed.createComponent(ListaarchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
