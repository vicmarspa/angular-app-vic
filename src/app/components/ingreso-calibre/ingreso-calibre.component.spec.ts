import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoCalibreComponent } from './ingreso-calibre.component';

describe('IngresoCalibreComponent', () => {
  let component: IngresoCalibreComponent;
  let fixture: ComponentFixture<IngresoCalibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoCalibreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoCalibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
