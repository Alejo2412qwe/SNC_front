import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespegablemeneComponent } from './despegablemene.component';

describe('DespegablemeneComponent', () => {
  let component: DespegablemeneComponent;
  let fixture: ComponentFixture<DespegablemeneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespegablemeneComponent]
    });
    fixture = TestBed.createComponent(DespegablemeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
