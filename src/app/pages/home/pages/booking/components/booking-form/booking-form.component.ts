import {Component, Input, OnInit} from '@angular/core';
import {BaseBookingFormComponent} from '../../../../components/base-booking-form/base-booking-form.component';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {BookingDataService} from '../../../../services/booking-data.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent extends BaseBookingFormComponent implements OnInit {
  constructor(public fb: FormBuilder,
              public router: Router,
              public bookingDataService: BookingDataService) {
    super(fb, router, bookingDataService);
  }

  ngOnInit(): void {
    this.createForm();
    this.createFormControls();

  }

}
