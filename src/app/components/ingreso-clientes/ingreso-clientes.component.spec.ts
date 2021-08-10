import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoClientesComponent } from './ingreso-clientes.component';

describe('IngresoClientesComponent', () => {
  let component: IngresoClientesComponent;
  let fixture: ComponentFixture<IngresoClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
