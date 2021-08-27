import { TestBed } from '@angular/core/testing';

import { ServicioGruasService } from './servicio-gruas.service';

describe('ServicioGruasService', () => {
  let service: ServicioGruasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioGruasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
