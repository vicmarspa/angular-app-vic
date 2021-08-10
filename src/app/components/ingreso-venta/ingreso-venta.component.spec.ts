import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoVentaComponent } from './ingreso-venta.component';

describe('IngresoVentaComponent', () => {
  let component: IngresoVentaComponent;
  let fixture: ComponentFixture<IngresoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
