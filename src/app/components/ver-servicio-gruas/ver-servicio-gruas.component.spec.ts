import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerServicioGruasComponent } from './ver-servicio-gruas.component';

describe('VerServicioGruasComponent', () => {
  let component: VerServicioGruasComponent;
  let fixture: ComponentFixture<VerServicioGruasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerServicioGruasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerServicioGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
