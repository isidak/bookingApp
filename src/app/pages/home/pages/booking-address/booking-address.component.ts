import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BookingInfoComponent} from '../booking-info/booking-info.component';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BookingDataService} from '../../services/booking-data.service';

@Component({
  selector: 'app-booking-address',
  templateUrl: './booking-address.component.html',
  styleUrls: ['./booking-address.component.css']
})
export class BookingAddressComponent extends BookingInfoComponent implements OnInit {

  constructor(public fb: FormBuilder,
              public router: Router,
              public bookingDataService: BookingDataService) {
    super(fb, router, bookingDataService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getFormArray(5);
    this.bookingForm.push(this.fb.control('', Validators.required));
    this.patchValues(this.bookingDataService.getFormData());
    this.bookingDataService.setFormStatus(this.baseForm.status);

  }

}
