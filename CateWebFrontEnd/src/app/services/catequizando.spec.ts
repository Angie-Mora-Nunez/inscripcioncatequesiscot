import { TestBed } from '@angular/core/testing';

import { Catequizando } from './catequizando';

describe('Catequizando', () => {
  let service: Catequizando;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Catequizando);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
