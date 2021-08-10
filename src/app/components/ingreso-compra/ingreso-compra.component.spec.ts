import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoCompraComponent } from './ingreso-compra.component';

describe('IngresoCompraComponent', () => {
  let component: IngresoCompraComponent;
  let fixture: ComponentFixture<IngresoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
