import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaClientesComponent } from './busqueda-clientes.component';

describe('BusquedaClientesComponent', () => {
  let component: BusquedaClientesComponent;
  let fixture: ComponentFixture<BusquedaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
