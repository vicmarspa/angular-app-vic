import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoVentaFinalComponent } from './ingreso-venta-final.component';

describe('IngresoVentaFinalComponent', () => {
  let component: IngresoVentaFinalComponent;
  let fixture: ComponentFixture<IngresoVentaFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoVentaFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoVentaFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
