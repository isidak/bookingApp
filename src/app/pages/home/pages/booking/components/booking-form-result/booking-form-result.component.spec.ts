import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFormResultComponent } from './booking-form-result.component';

describe('BookingFormResultComponent', () => {
  let component: BookingFormResultComponent;
  let fixture: ComponentFixture<BookingFormResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingFormResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFormResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
