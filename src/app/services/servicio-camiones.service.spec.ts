import { TestBed } from '@angular/core/testing';

import { ServicioCamionesService } from './servicio-camiones.service';

describe('ServicioCamionesService', () => {
  let service: ServicioCamionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCamionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
