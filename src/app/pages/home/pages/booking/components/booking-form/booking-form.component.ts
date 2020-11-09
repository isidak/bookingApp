import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BaseBookingFormComponent} from '../../../../components/base-booking-form/base-booking-form.component';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {BookingDataService} from '../../../../services/booking-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent extends BaseBookingFormComponent implements OnInit, OnDestroy {
  @Output() disableButton = new EventEmitter();
  private subscriptions = new Subscription();
  constructor(public fb: FormBuilder,
              public router: Router,
              public bookingDataService: BookingDataService) {
    super(fb, router, bookingDataService);
  }

  ngOnInit(): void {
    this.createForm();
    this.createFormControls();
    this.patchValues(this.bookingDataService.getFormData());
    this.checkFormStatus();
  }

  checkFormStatus(){
    const formStatusSub = this.baseForm.statusChanges.subscribe(res => this.disableButton.next(res === 'INVALID'));
    this.subscriptions.add(formStatusSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
