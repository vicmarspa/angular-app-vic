import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoServicioGruasComponent } from './pago-servicio-gruas.component';

describe('PagoServicioGruasComponent', () => {
  let component: PagoServicioGruasComponent;
  let fixture: ComponentFixture<PagoServicioGruasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoServicioGruasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoServicioGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
