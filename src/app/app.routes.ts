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
import { RoleGuard } from './_guards/role-guard';
import { Unauthorized } from './Components/unauthorized/unauthorized';
import { BookingSuccessComponent } from './Components/booking-success/booking-success';

export const routes: Routes = [
  { path: '', component: Home },
  
  { path: 'booking/:id', component: ShowBooking, canActivate: [RoleGuard], data: { roles: ['user'] }},
  { path: 'book/:id', component: Book, canActivate: [RoleGuard], data: { roles: ['user'] }},
  { path: 'extras', component: Extras, canActivate: [RoleGuard], data: { roles: ['user'] }},
  { path: 'summary', component: Summary, canActivate: [RoleGuard], data: { roles: ['user'] }},
  { path: 'success', component: Success, canActivate: [RoleGuard], data: { roles: ['user'] }},

  { path: 'register', component:Register},
  { path: 'login', component:Login},
  { path: 'logout', component:Logout},
  { path: 'unauthorized', component:Unauthorized},

  { path: 'admin/allBookings', component: AllBookings, canActivate: [RoleGuard], data: { roles: ['admin'] }},
  { path: 'admin/settings', component:Settings, canActivate: [RoleGuard], data: { roles: ['admin'] }},
  { path: 'admin/addMovie', component:AddMovie, canActivate: [RoleGuard], data: { roles: ['admin'] }},
  { path: 'booking-success', component: BookingSuccessComponent }
];

