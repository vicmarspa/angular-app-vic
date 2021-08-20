import { TestBed } from '@angular/core/testing';

import { IngresoCamarasService } from './ingreso-camaras.service';

describe('IngresoCamarasService', () => {
  let service: IngresoCamarasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoCamarasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
