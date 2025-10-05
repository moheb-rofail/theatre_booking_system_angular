import { Component, effect, inject, signal } from '@angular/core';
import { Booking } from '../../../_services/booking';
import { RouterLink } from '@angular/router';
import { IBooking } from '../../../_interfaces/ibooking';

@Component({
  selector: 'app-all-bookings',
  imports: [RouterLink],
  templateUrl: './all-bookings.html',
  styleUrls: ['./all-bookings.css']
})
export class AllBookings {
  bookingService = inject(Booking);
  bookings = this.bookingService.getAllBookings();

  Bookings:IBooking[] = [];
  hasData = signal(false);

  constructor() {
    // مراقبة تغييرات الـ bookings
    effect(() => {
      const currentBookings = this.bookings();
      if (currentBookings && currentBookings.length > 0) {
        this.hasData.set(true);
        this.Bookings = currentBookings;
        console.log(this.hasData());
    console.log(this.Bookings);
      }
    });
    
  }
  
}
