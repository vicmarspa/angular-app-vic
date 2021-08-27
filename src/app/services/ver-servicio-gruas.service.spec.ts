import { TestBed } from '@angular/core/testing';

import { VerServicioGruasService } from './ver-servicio-gruas.service';

describe('VerServicioGruasService', () => {
  let service: VerServicioGruasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerServicioGruasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
