import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BookingFormComponent} from './components/booking-form/booking-form.component';
import {BookingFormResultComponent} from './components/booking-form-result/booking-form-result.component';
import {BehaviorSubject, Subscription} from 'rxjs';
import {BookingDataService} from '../../services/booking-data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(BookingFormComponent) bookingFormComponent: BookingFormComponent;
  @ViewChild(BookingFormResultComponent) bookingFormResultComponent: BookingFormResultComponent;
  formValue$ = new BehaviorSubject(null);
  private subscriptions = new Subscription();
  baseFormArray: string[];
  disabledButton: boolean;

  constructor(private bookingDataService: BookingDataService) {
  }

  ngOnInit(): void {
    this.getFormArray(2);
  }

  disableButton(event){
    this.disabledButton = event;
    console.log(event);
  }

  getFormArray(length): void {
    const formArraySub = this.bookingDataService.getBaseFormArray().subscribe((res) => {
      this.baseFormArray = res.slice(0, length);
    });
    this.subscriptions.add(formArraySub);
  }

  ngAfterViewInit(): void {
    const formValueSub = this.bookingFormComponent.baseForm.valueChanges.subscribe(res => {
      this.formValue$.next(res);
      this.bookingDataService.setData(res);
    });
    this.subscriptions.add(formValueSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
