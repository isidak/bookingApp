import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseBookingFormComponent } from './base-booking-form.component';

describe('BaseBookingFormComponent', () => {
  let component: BaseBookingFormComponent;
  let fixture: ComponentFixture<BaseBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseBookingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
