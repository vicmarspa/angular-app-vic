import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPagoComponent } from './ingreso-pago.component';

describe('IngresoPagoComponent', () => {
  let component: IngresoPagoComponent;
  let fixture: ComponentFixture<IngresoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
