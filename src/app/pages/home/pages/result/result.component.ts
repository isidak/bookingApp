import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingDataService} from '../../services/booking-data.service';
import {Subscription} from 'rxjs';
import {BookingForm} from '../../models/booking-form.model';
import {BookingCostService} from '../../services/booking-cost.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  bookingData: BookingForm;
  frequencyArray = [];
  priceHourArray = [];
  private bookingCost: number;


  constructor(private bookingDataService: BookingDataService,
              private bookingCostService: BookingCostService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getFrequencyArray();
    this.getPriceHourArray();
    this.getBookingData();
    this.getBookingCost();
  }

  getFrequencyArray() {
    const frequencySub = this.bookingDataService.getFrequency().subscribe((res) => this.frequencyArray = res);
    this.subscriptions.add(frequencySub);
  }

  getPriceHourArray() {
    const priceHourSub = this.bookingDataService.getPricePerHour().subscribe((res) => this.priceHourArray = res);
    this.subscriptions.add(priceHourSub);
  }

  getBookingData() {
    const bookingDataSub = this.bookingDataService.baseFormValues$.subscribe(res => {
      const form = {...res};
      form.frequency = this.frequencyArray.find((val) => val.value === +form.frequency)?.title;
      form.priceHour = this.priceHourArray.find((val) => val.value === +form.priceHour)?.title;
      this.bookingData = form;
    });
    this.subscriptions.add(bookingDataSub);

  }

  getBookingCost() {
    const bookingCostSub = this.bookingCostService.bookingCost$.subscribe(res => this.bookingCost = res);
    this.subscriptions.add(bookingCostSub);
  }

  saveBooking() {
    this.bookingDataService.saveBooking({...this.bookingData, price: this.bookingCost});
    this.bookingDataService.resetForm();
    this.router.navigate(['home/saved']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
