import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {BookingDataService} from '../../services/booking-data.service';
import {BaseBookingFormComponent} from '../../components/base-booking-form/base-booking-form.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-booking-info',
  templateUrl: './booking-info.component.html',
  styleUrls: ['./booking-info.component.css']
})
export class BookingInfoComponent extends BaseBookingFormComponent implements OnInit, AfterViewInit, OnDestroy {
  baseFormArray: string[];
  pricePerHourArray: any[];
  frequencyArray: any[];
  formArrays = [];
  private subscriptions = new Subscription();

  constructor(public fb: FormBuilder,
              public router: Router,
              public bookingDataService: BookingDataService) {
    super(fb, router, bookingDataService);
  }

  ngOnInit(): void {
    this.getFormArray(4);
    this.getFrequency();
    this.getPricePerHour();
    this.createForm();
    this.createFormControls();
    this.patchValues(this.bookingDataService.getFormData());
  }

  getFormArray(length): void {
    const formArraySub = this.bookingDataService.getBaseFormArray().subscribe((res) => {
      this.baseFormArray = res.slice(0, length);
    });
    this.subscriptions.add(formArraySub);
  }

  getPricePerHour() {
    const pricePerHourSub = this.bookingDataService.getPricePerHour().subscribe((res) => {
      this.pricePerHourArray = res;
      this.formArrays.push(res);
    });
    this.subscriptions.add(pricePerHourSub);
  }

  getFrequency() {
    const frequencySub = this.bookingDataService.getFrequency().subscribe((res) => {
      this.frequencyArray = res;
      this.formArrays.push(res);
    });
    this.subscriptions.add(frequencySub);
  }


  ngAfterViewInit(): void {
    const formValueSub = this.baseForm.valueChanges.subscribe(res => {
      this.bookingDataService.setData(res);
    });
    this.subscriptions.add(formValueSub);
  }

  addressStep() {
    this.baseFormArray.push('address');
    this.bookingForm.push(this.fb.control(''));



  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
