import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaVpcComponent } from './busqueda-vpc.component';

describe('BusquedaVpcComponent', () => {
  let component: BusquedaVpcComponent;
  let fixture: ComponentFixture<BusquedaVpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaVpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaVpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
