import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoFrutaComponent } from './ingreso-fruta.component';

describe('IngresoFrutaComponent', () => {
  let component: IngresoFrutaComponent;
  let fixture: ComponentFixture<IngresoFrutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoFrutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoFrutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
