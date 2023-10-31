import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListatipoformularioComponent } from './listatipoformulario.component';

describe('ListatipoformularioComponent', () => {
  let component: ListatipoformularioComponent;
  let fixture: ComponentFixture<ListatipoformularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListatipoformularioComponent]
    });
    fixture = TestBed.createComponent(ListatipoformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
