import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProcesoComponent } from './ver-proceso.component';

describe('VerProcesoComponent', () => {
  let component: VerProcesoComponent;
  let fixture: ComponentFixture<VerProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProcesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
