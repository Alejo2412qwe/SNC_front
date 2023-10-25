import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaprocesosSubprocesosComponent } from './listaprocesos-subprocesos.component';

describe('ListaprocesosSubprocesosComponent', () => {
  let component: ListaprocesosSubprocesosComponent;
  let fixture: ComponentFixture<ListaprocesosSubprocesosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaprocesosSubprocesosComponent]
    });
    fixture = TestBed.createComponent(ListaprocesosSubprocesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
