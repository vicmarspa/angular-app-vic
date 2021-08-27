import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioGruasComponent } from './servicio-gruas.component';

describe('ServicioGruasComponent', () => {
  let component: ServicioGruasComponent;
  let fixture: ComponentFixture<ServicioGruasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioGruasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
