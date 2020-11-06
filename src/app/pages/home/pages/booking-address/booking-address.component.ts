import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BookingInfoComponent} from '../booking-info/booking-info.component';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {BookingDataService} from '../../services/booking-data.service';

@Component({
  selector: 'app-booking-address',
  templateUrl: './booking-address.component.html',
  styleUrls: ['./booking-address.component.css']
})
export class BookingAddressComponent extends BookingInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(public fb: FormBuilder,
              public router: Router,
              public bookingDataService: BookingDataService) {
    super(fb, router, bookingDataService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getFormArray(5);
    this.bookingForm.push(this.fb.control(''));
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
