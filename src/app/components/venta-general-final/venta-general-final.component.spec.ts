import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaGeneralFinalComponent } from './venta-general-final.component';

describe('VentaGeneralFinalComponent', () => {
  let component: VentaGeneralFinalComponent;
  let fixture: ComponentFixture<VentaGeneralFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaGeneralFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaGeneralFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
