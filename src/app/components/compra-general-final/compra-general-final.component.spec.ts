import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraGeneralFinalComponent } from './compra-general-final.component';

describe('CompraGeneralFinalComponent', () => {
  let component: CompraGeneralFinalComponent;
  let fixture: ComponentFixture<CompraGeneralFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraGeneralFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraGeneralFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
