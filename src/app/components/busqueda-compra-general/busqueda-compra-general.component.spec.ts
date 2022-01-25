import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCompraGeneralComponent } from './busqueda-compra-general.component';

describe('BusquedaCompraGeneralComponent', () => {
  let component: BusquedaCompraGeneralComponent;
  let fixture: ComponentFixture<BusquedaCompraGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaCompraGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaCompraGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
