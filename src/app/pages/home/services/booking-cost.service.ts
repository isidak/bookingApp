import {Injectable} from '@angular/core';
import {BookingDataService} from './booking-data.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingCostService {
  private bookingCost = new BehaviorSubject(0);

  bookingCost$ = this.bookingCost.asObservable();

  constructor(private bookingDataService: BookingDataService) {
  }

  setBookingCost(bookingValues) {
    const price = ((bookingValues.m2 - 80) / 60 + 2.5) * (bookingValues.priceHour);
    this.bookingCost.next(price + (price * +bookingValues.frequency));
  }

}
