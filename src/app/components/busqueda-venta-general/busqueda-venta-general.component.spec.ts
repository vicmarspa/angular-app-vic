import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaVentaGeneralComponent } from './busqueda-venta-general.component';

describe('BusquedaVentaGeneralComponent', () => {
  let component: BusquedaVentaGeneralComponent;
  let fixture: ComponentFixture<BusquedaVentaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaVentaGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaVentaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
