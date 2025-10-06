import { Routes } from '@angular/router';
import { AllBookings } from './Components/Admin/all-bookings/all-bookings';
import { Home } from './Components/home/home';
import { ShowBooking } from './Components/booking/show-booking/show-booking';
import { Book } from './Components/booking/book/book';
import { Settings } from './Components/Admin/settings/settings';
import { Extras } from './Components/booking/extras/extras';
import { Summary } from './Components/booking/summary/summary';
import { Success } from '../../success/success';
import { Register } from './Components/Auth/register/register';
import { Login } from './Components/Auth/login/login';
import { Logout } from './Components/Auth/logout/logout';
import { AddMovie } from './Components/Movies/add-movie/add-movie';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'admin/allBookings', component: AllBookings },
  { path: 'admin/settings', component:Settings},
  { path: 'booking/:id', component: ShowBooking },
  { path: 'book/:id', component: Book },
  { path: 'extras', component: Extras },
  { path: 'summary', component: Summary },
  { path: 'success', component: Success },
  { path: 'register', component:Register},
  { path: 'login', component:Login},
  { path: 'logout', component:Logout},
  { path: 'admin/addMovie', component:AddMovie}
];

