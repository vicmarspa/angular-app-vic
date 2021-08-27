import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriendoBinsComponent } from './arriendo-bins.component';

describe('ArriendoBinsComponent', () => {
  let component: ArriendoBinsComponent;
  let fixture: ComponentFixture<ArriendoBinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriendoBinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriendoBinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
