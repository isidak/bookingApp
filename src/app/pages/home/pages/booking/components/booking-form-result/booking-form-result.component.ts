import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseBookingFormComponent} from '../../../../components/base-booking-form/base-booking-form.component';
import {Router} from '@angular/router';
import {BookingDataService} from '../../../../services/booking-data.service';

@Component({
  selector: 'app-booking-form-result',
  templateUrl: './booking-form-result.component.html',
  styleUrls: ['./booking-form-result.component.css']
})
export class BookingFormResultComponent extends BaseBookingFormComponent implements OnInit {
  @Input() disableButton: boolean = true;

  constructor(public fb: FormBuilder,
              public router: Router,
              public bookingDataService: BookingDataService) {
    super(fb, router, bookingDataService);
  }

  ngOnInit(): void {
    this.createForm();
    this.createFormControls();
    this.bookingDataService.baseFormValues$.subscribe(res => {
      if (res) {
        const formValues = {bookingForm: []};
        Object.values(res).forEach((val) => formValues.bookingForm.push(val));
        this.patchValues(formValues);
      }
    });
    this.disableForm();
  }

}
