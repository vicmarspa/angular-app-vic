import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoCamarasComponent } from './ingreso-camaras.component';

describe('IngresoCamarasComponent', () => {
  let component: IngresoCamarasComponent;
  let fixture: ComponentFixture<IngresoCamarasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoCamarasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoCamarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
