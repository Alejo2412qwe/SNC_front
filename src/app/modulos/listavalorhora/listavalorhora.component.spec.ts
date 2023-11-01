import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListavalorhoraComponent } from './listavalorhora.component';

describe('ListavalorhoraComponent', () => {
  let component: ListavalorhoraComponent;
  let fixture: ComponentFixture<ListavalorhoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListavalorhoraComponent]
    });
    fixture = TestBed.createComponent(ListavalorhoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
