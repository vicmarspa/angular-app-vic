import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminadosComponent } from './eliminados.component';

describe('EliminadosComponent', () => {
  let component: EliminadosComponent;
  let fixture: ComponentFixture<EliminadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
