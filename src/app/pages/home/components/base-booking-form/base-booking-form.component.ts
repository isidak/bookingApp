import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BookingDataService} from '../../services/booking-data.service';

@Component({
  selector: 'app-base-booking-form',
  templateUrl: './base-booking-form.component.html',
  styleUrls: ['./base-booking-form.component.css']
})
export class BaseBookingFormComponent {

  @Input() baseFormArray: any[];
  baseForm: FormGroup;
  disabledForm: boolean;

  constructor(public fb: FormBuilder,
              public router: Router,
              public bookingDataService: BookingDataService) {
  }


  createForm() {
    this.baseForm = this.fb.group({
      bookingForm: this.fb.array([])
    });
  }

  createFormControls() {
    this.baseFormArray.forEach((formControl) => {
      this.bookingForm.push(this.fb.control('', Validators.required));
    });
  }

  get bookingForm() {
    return this.baseForm.get('bookingForm') as FormArray;
  }

  patchValues(values) {
    this.baseForm.patchValue(values);
  }

  disableForm() {
    this.disabledForm = !this.disabledForm;
    if (this.disabledForm) {
      this.baseForm.disable();
    }
  }

  navigate(id) {
    // if (this.baseForm.valid) {
      this.bookingDataService.setData(this.baseForm.value);
      this.router.navigate(['/home/' + id]);
    // }
  }

}
