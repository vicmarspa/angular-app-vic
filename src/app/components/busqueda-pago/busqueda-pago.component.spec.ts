import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPagoComponent } from './busqueda-pago.component';

describe('BusquedaPagoComponent', () => {
  let component: BusquedaPagoComponent;
  let fixture: ComponentFixture<BusquedaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
