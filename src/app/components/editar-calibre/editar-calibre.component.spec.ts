import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCalibreComponent } from './editar-calibre.component';

describe('EditarCalibreComponent', () => {
  let component: EditarCalibreComponent;
  let fixture: ComponentFixture<EditarCalibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCalibreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCalibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
