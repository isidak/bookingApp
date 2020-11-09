import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BookingDataService} from '../../../services/booking-data.service';
import {BookingCostService} from '../../../services/booking-cost.service';
import {Observable, Subscription} from 'rxjs';
import {BookingForm} from '../../../models/booking-form.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-booking-price',
  templateUrl: './booking-price.component.html',
  styleUrls: ['./booking-price.component.css']
})
export class BookingPriceComponent implements OnInit, OnDestroy {
  @Output() save = new EventEmitter();
  private subscriptions = new Subscription();
  priceValue$: Observable<number>;
  bookingSteps: string[];
  currentStep: string;
  formStatusDisabled = true;

  constructor(private bookingDataService: BookingDataService,
              private bookingCostService: BookingCostService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCurrentStep();
    this.getBookingData();
    this.getBookingCost();
    this.getBookingSteps();
    this.getFormStatus();
  }

  getBookingData() {
    const bookingDataSub = this.bookingDataService.baseFormValues$.subscribe((res) => this.setBookingCost(res));
    this.subscriptions.add(bookingDataSub);
  }

  setBookingCost(bookingValues: BookingForm) {
    this.bookingCostService.setBookingCost(bookingValues);
  }

  getBookingCost() {
    this.priceValue$ = this.bookingCostService.bookingCost$;
  }

  getBookingSteps() {
    const currentRouteSub = this.bookingDataService.getBookingSteps().subscribe(res => this.bookingSteps = res);
    this.subscriptions.add(currentRouteSub);
  }

  getCurrentStep() {
    this.route.url.subscribe(res => this.currentStep = res[0].path);
  }

  getFormStatus(){
    const formStatusDisabledSub = this.bookingDataService.baseFormStatus$.subscribe( res => this.formStatusDisabled = res === 'INVALID');
    this.subscriptions.add(formStatusDisabledSub);
  }

  nextStep() {
    const currentStepIndex = this.bookingSteps.findIndex((val) => this.currentStep === val);
    const nextStep = this.bookingSteps[currentStepIndex + 1];
    if (this.nextButtonValue() === 'Save') {
      this.save.emit();
    } else {

      this.router.navigate(['home/' + nextStep]);
    }
  }

  nextButtonValue() {
    const currentStepIndex = this.bookingSteps.findIndex((val) => this.currentStep === val);
    const numberOfSteps = this.bookingSteps.length;
    if ((+currentStepIndex + 1) === numberOfSteps) {
      return 'Save';
    } else {
      return 'Next';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
