import { Component, inject, signal } from '@angular/core';
import { Booking } from '../../../_services/booking';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-bookings',
  imports: [RouterLink],
  templateUrl: './all-bookings.html',
  styleUrls: ['./all-bookings.css']
})
export class AllBookings {
  bookingService = inject(Booking);
  bookings = this.bookingService.getAllBookings();
  
}
