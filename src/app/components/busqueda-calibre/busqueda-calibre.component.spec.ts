import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCalibreComponent } from './busqueda-calibre.component';

describe('BusquedaCalibreComponent', () => {
  let component: BusquedaCalibreComponent;
  let fixture: ComponentFixture<BusquedaCalibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaCalibreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaCalibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
