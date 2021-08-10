import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoCompraFinalComponent } from './ingreso-compra-final.component';

describe('IngresoCompraFinalComponent', () => {
  let component: IngresoCompraFinalComponent;
  let fixture: ComponentFixture<IngresoCompraFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoCompraFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoCompraFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
