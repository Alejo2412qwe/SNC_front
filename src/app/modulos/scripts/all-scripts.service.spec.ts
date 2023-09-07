import { TestBed } from '@angular/core/testing';

import { AllScriptsService } from './all-scripts.service';

describe('AllScriptsService', () => {
  let service: AllScriptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllScriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});