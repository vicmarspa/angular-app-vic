import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoServicioCamarasComponent } from './pago-servicio-camaras.component';

describe('PagoServicioCamarasComponent', () => {
  let component: PagoServicioCamarasComponent;
  let fixture: ComponentFixture<PagoServicioCamarasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoServicioCamarasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoServicioCamarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
