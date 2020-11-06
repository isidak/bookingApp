import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BookingInfoComponent } from './pages/booking-info/booking-info.component';
import { BaseBookingFormComponent } from './components/base-booking-form/base-booking-form.component';
import { BookingFormComponent } from './pages/booking/components/booking-form/booking-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BookingFormResultComponent } from './pages/booking/components/booking-form-result/booking-form-result.component';
import { BookingAddressComponent } from './pages/booking-address/booking-address.component';
import { BookingPriceComponent } from './pages/components/booking-price/booking-price.component';
import { ResultComponent } from './pages/result/result.component';
import { SavedComponent } from './pages/saved/saved.component';


@NgModule({
  declarations: [HomeComponent, BookingComponent, BookingInfoComponent, BaseBookingFormComponent, BookingFormComponent, BookingFormResultComponent, BookingAddressComponent, BookingPriceComponent, ResultComponent, SavedComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
