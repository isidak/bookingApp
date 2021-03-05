import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {BookingForm} from '../models/booking-form.model';
import {BookingFrequency} from '../models/booking-frequency.model';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {
  baseFormArray = ['Postal code', 'm2', 'frequency', 'price/hour', 'address'];
  bookingSteps = ['start', 'bookinginfo', 'address', 'result'];
  pricePerHourArray = [{
    title: '10 USD',
    value: 10
  },
    {
      title: '12 USD',
      value: 12
    },
    {
      title: '14 USD',
      value: 14
    },
    {
      title: '16 USD',
      value: 16
    },
    {
      title: '18 USD',
      value: 18
    },
    {
      title: '20 USD',
      value: 20
    }];
  frequencyArray: BookingFrequency[] = [
    {
      title: 'every week',
      value: 0.1
    },
    {
      title: 'every 2 weeks',
      value: 0.2
    },
    {
      title: 'every 4 weeks',
      value: 0.3
    },
    {
      title: 'one time',
      value: 0.4
    }];
  formValues: any;
  baseForm = new BookingForm();
  baseFormValues$ = new BehaviorSubject<BookingForm>(new BookingForm());
  baseFormStatus$ = new BehaviorSubject('INVALID');
  private savedBookings: BookingForm[] = [];

  constructor() {
  }


  setData(formValue) {
    this.formValues = formValue;
    this.formValues.bookingForm.forEach((val, index) => this.baseForm[Object.keys(this.baseForm)[index]] = val);
    this.baseFormValues$.next({...this.baseForm});
  }

  setFormStatus(status){
    this.baseFormStatus$.next(status);
  }

  getFormData() {
    return {...this.formValues};
  }

  getBaseFormArray() {
    return of([...this.baseFormArray]);
  }

  getPricePerHour() {
    return of([...this.pricePerHourArray]);
  }

  getFrequency() {
    return of([...this.frequencyArray]);
  }

  getBookingSteps() {
    return of([...this.bookingSteps]);
  }

  saveBooking(booking) {
    this.savedBookings.push(booking);
  }

  resetForm() {
    this.baseForm = new BookingForm();
    this.formValues = null;
    this.baseFormValues$.next({...this.baseForm});
  }

}
