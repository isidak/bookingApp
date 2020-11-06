import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {BookingInfoComponent} from './pages/booking-info/booking-info.component';
import {BookingComponent} from './pages/booking/booking.component';
import {BookingAddressComponent} from './pages/booking-address/booking-address.component';
import {ResultComponent} from './pages/result/result.component';
import {SavedComponent} from './pages/saved/saved.component';

const routes: Routes = [
  {path: '', redirectTo: 'start'},
  {
    path: '', component: HomeComponent, children: [
      {path: 'start', component: BookingComponent},
      {path: 'bookinginfo', component: BookingInfoComponent},
      {path: 'address', component: BookingAddressComponent},
      {path: 'result', component: ResultComponent},
      {path: 'saved', component: SavedComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
