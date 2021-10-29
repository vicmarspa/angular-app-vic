import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcIngresoFinalComponent } from './vpc-ingreso-final.component';

describe('VpcIngresoFinalComponent', () => {
  let component: VpcIngresoFinalComponent;
  let fixture: ComponentFixture<VpcIngresoFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpcIngresoFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcIngresoFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
