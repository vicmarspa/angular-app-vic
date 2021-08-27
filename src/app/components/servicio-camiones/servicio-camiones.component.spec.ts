import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioCamionesComponent } from './servicio-camiones.component';

describe('ServicioCamionesComponent', () => {
  let component: ServicioCamionesComponent;
  let fixture: ComponentFixture<ServicioCamionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioCamionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioCamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
