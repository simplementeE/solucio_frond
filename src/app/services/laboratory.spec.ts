import { TestBed } from '@angular/core/testing';

import { Laboratory } from './laboratory';

describe('Laboratory', () => {
  let service: Laboratory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Laboratory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
