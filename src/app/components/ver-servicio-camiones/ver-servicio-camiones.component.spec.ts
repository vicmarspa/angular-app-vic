import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerServicioCamionesComponent } from './ver-servicio-camiones.component';

describe('VerServicioCamionesComponent', () => {
  let component: VerServicioCamionesComponent;
  let fixture: ComponentFixture<VerServicioCamionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerServicioCamionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerServicioCamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
