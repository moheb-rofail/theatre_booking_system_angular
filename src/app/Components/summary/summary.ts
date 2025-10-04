import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Booking } from '../../_services/booking';
import { IBooking } from '../../_interfaces/ibooking';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrls: ['./summary.css']
})
export class Summary implements OnInit {
  film = '';
  seats: number[] = [];
  seatPrice = 0;
  extras: any[] = [];
  total = 0;

  booking!:IBooking;

  private BookingService = inject(Booking);
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);

      this.film = params['film'];
      this.seats = params['seats']?.split(',').map((s: string) => +s) || [];
      this.seatPrice = +params['seatPrice'];
      this.total = +params['total'];
      this.extras = params['extras'] ? JSON.parse(params['extras']) : [];

      console.log('Film:', this.film);
      console.log('Seats:', this.seats);
      console.log('Extras:', this.extras);
      console.log('Total:', this.total);
    });
  }

  bookings: IBooking[] = [];

  confirmBooking() {
    const requests = this.seats.map(seat => {
      var booking = {
        price: this.total,
        seat_number: seat,
        user_id: 1,
        movie_id: 1,
        party_date: '2024-12-02',
        party_number: 'first'
      };

      this.bookings.push(booking);
    });

    this.bookings.forEach(element => {
      this.BookingService.addBooking(element).subscribe({
        next: (res) => console.log('Booking added:', res),
        error: (err) => console.error('Error:', err)
      });
    });
  }
}
