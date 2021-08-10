import { TestBed } from '@angular/core/testing';

import { PagoServiciosService } from './pago-servicios.service';

describe('PagoServiciosService', () => {
  let service: PagoServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
