import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcIngresoPrincipalComponent } from './cpc-ingreso-principal.component';

describe('CpcIngresoPrincipalComponent', () => {
  let component: CpcIngresoPrincipalComponent;
  let fixture: ComponentFixture<CpcIngresoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpcIngresoPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcIngresoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
