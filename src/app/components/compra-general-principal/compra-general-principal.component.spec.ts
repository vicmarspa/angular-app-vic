import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraGeneralPrincipalComponent } from './compra-general-principal.component';

describe('CompraGeneralPrincipalComponent', () => {
  let component: CompraGeneralPrincipalComponent;
  let fixture: ComponentFixture<CompraGeneralPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraGeneralPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraGeneralPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
