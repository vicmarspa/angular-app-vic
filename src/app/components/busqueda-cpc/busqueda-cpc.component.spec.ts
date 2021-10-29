import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCpcComponent } from './busqueda-cpc.component';

describe('BusquedaCpcComponent', () => {
  let component: BusquedaCpcComponent;
  let fixture: ComponentFixture<BusquedaCpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaCpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaCpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
