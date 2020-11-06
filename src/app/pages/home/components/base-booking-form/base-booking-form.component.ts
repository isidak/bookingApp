import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {BookingDataService} from '../../services/booking-data.service';

@Component({
  selector: 'app-base-booking-form',
  templateUrl: './base-booking-form.component.html',
  styleUrls: ['./base-booking-form.component.css']
})
export class BaseBookingFormComponent implements OnInit {
  @Input() baseFormArray: any[];
  // @Input() formValues: BehaviorSubject<any>;
  baseForm: FormGroup;
  disabledForm: boolean;
  // formValue$ = new BehaviorSubject(null);
  // private subscriptions = new Subscription();

  constructor(public fb: FormBuilder,
              public router: Router,
              public bookingDataService: BookingDataService) {
  }

  ngOnInit(): void {
  }

  createForm() {
    this.baseForm = this.fb.group({
      bookingForm: this.fb.array([])
    });
  }

  createFormControls() {
    this.baseFormArray.forEach((formControl) => {
      this.bookingForm.push(this.fb.control(''));
    });
  }

  get bookingForm() {
    return this.baseForm.get('bookingForm') as FormArray;
  }

  // sendFormValues(){
  //   const formValueSub = this.bookingFormComponent.baseForm.valueChanges.subscribe( res => {
  //     this.formValue$.next(res);
  //     this.bookingDataService.setData(res);
  //   });
  //   this.subscriptions.add(formValueSub);
  // }

  patchValues(values) {
    this.baseForm.patchValue(values);
  }

  disableForm() {
    this.disabledForm = !this.disabledForm;
    if (this.disabledForm) {
      this.baseForm.disable();
    }
  }

  navigate(id){
    this.bookingDataService.setData(this.baseForm.value);
    this.router.navigate(['/home/' + id]);
  }

}
