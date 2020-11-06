import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingCostService {
  private bookingCost = new BehaviorSubject(0);

  bookingCost$ = this.bookingCost.asObservable();

  constructor() {
  }

  setBookingCost(bookingValues) {
    const price = ((bookingValues.m2 - 80) / 60 + 2.5) * (bookingValues.priceHour);
    this.bookingCost.next(price + (price * +bookingValues.frequency));
  }

}
