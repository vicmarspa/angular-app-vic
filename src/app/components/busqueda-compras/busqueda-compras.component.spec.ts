import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaComprasComponent } from './busqueda-compras.component';

describe('BusquedaComprasComponent', () => {
  let component: BusquedaComprasComponent;
  let fixture: ComponentFixture<BusquedaComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
