import { TestBed } from '@angular/core/testing';

import { PaltaChilenaService } from './palta-chilena.service';

describe('PaltaChilenaService', () => {
  let service: PaltaChilenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaltaChilenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
