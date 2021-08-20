import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProcesoCamarasComponent } from './ver-proceso-camaras.component';

describe('VerProcesoCamarasComponent', () => {
  let component: VerProcesoCamarasComponent;
  let fixture: ComponentFixture<VerProcesoCamarasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProcesoCamarasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProcesoCamarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
