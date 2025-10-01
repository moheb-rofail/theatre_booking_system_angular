import { Component, inject } from '@angular/core';
import { Booking } from '../../../_services/booking';
import { IBooking } from '../../../_interfaces/ibooking';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-show-booking',
  imports: [],
  templateUrl: './show-booking.html',
  styleUrl: './show-booking.css'
})
export class ShowBooking {
  bookingService = inject(Booking);
  private route = inject(ActivatedRoute);
  
  //booking = this.bookingService.getBooking(id);
  booking = toSignal<IBooking>(
  this.route.params.pipe(
    map(params => Number(params['id'])),
    switchMap(id => this.bookingService.getBooking(id)) // Observable<IProduct>
  ));
}
