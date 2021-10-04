import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcIngresoFinalComponent } from './cpc-ingreso-final.component';

describe('CpcIngresoFinalComponent', () => {
  let component: CpcIngresoFinalComponent;
  let fixture: ComponentFixture<CpcIngresoFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpcIngresoFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcIngresoFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
