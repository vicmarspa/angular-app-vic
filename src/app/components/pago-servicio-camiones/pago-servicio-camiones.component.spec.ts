import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoServicioCamionesComponent } from './pago-servicio-camiones.component';

describe('PagoServicioCamionesComponent', () => {
  let component: PagoServicioCamionesComponent;
  let fixture: ComponentFixture<PagoServicioCamionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoServicioCamionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoServicioCamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
