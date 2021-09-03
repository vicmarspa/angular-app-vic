import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoServicioBinsComponent } from './pago-servicio-bins.component';

describe('PagoServicioBinsComponent', () => {
  let component: PagoServicioBinsComponent;
  let fixture: ComponentFixture<PagoServicioBinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoServicioBinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoServicioBinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
