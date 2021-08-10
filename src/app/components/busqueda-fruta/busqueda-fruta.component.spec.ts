import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaFrutaComponent } from './busqueda-fruta.component';

describe('BusquedaFrutaComponent', () => {
  let component: BusquedaFrutaComponent;
  let fixture: ComponentFixture<BusquedaFrutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaFrutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaFrutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
