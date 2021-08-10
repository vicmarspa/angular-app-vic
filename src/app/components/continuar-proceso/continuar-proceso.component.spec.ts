import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuarProcesoComponent } from './continuar-proceso.component';

describe('ContinuarProcesoComponent', () => {
  let component: ContinuarProcesoComponent;
  let fixture: ComponentFixture<ContinuarProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuarProcesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
