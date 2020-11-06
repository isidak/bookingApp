import { TestBed } from '@angular/core/testing';

import { BookingCostService } from './booking-cost.service';

describe('BookingCostService', () => {
  let service: BookingCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
