import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArriendoBinsComponent } from './ver-arriendo-bins.component';

describe('VerArriendoBinsComponent', () => {
  let component: VerArriendoBinsComponent;
  let fixture: ComponentFixture<VerArriendoBinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerArriendoBinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerArriendoBinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
