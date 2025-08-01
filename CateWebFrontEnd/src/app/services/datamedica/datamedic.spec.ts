import { TestBed } from '@angular/core/testing';

import { Datamedic } from './datamedic';

describe('Datamedic', () => {
  let service: Datamedic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Datamedic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
