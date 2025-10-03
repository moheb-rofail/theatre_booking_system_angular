import { Routes } from '@angular/router';
import { AllBookings } from './Components/Admin/all-bookings/all-bookings';
import { Home } from './Components/home/home';
import { ShowBooking } from './Components/booking/show-booking/show-booking';
import { Book } from './Components/booking/book/book';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'admin/allBookings', component: AllBookings },
  { path: 'booking/:id', component: ShowBooking },
  { path: 'book', component: Book }
];

