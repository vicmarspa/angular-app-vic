import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoFinalComponent } from './ingreso-final.component';

describe('IngresoFinalComponent', () => {
  let component: IngresoFinalComponent;
  let fixture: ComponentFixture<IngresoFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
