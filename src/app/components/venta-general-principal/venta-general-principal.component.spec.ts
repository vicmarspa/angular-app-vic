import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaGeneralPrincipalComponent } from './venta-general-principal.component';

describe('VentaGeneralPrincipalComponent', () => {
  let component: VentaGeneralPrincipalComponent;
  let fixture: ComponentFixture<VentaGeneralPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaGeneralPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaGeneralPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
