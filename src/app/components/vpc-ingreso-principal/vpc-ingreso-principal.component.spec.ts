import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcIngresoPrincipalComponent } from './vpc-ingreso-principal.component';

describe('VpcIngresoPrincipalComponent', () => {
  let component: VpcIngresoPrincipalComponent;
  let fixture: ComponentFixture<VpcIngresoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpcIngresoPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcIngresoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
