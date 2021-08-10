import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFrutaComponent } from './editar-fruta.component';

describe('EditarFrutaComponent', () => {
  let component: EditarFrutaComponent;
  let fixture: ComponentFixture<EditarFrutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFrutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFrutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
