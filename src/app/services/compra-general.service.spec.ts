import { TestBed } from '@angular/core/testing';

import { CompraGeneralService } from './compra-general.service';

describe('CompraGeneralService', () => {
  let service: CompraGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
