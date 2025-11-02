import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Booking } from '../../../_services/booking';
import { IBooking } from '../../../_interfaces/ibooking';
import { Setting } from '../../../_services/setting';
import { ISetting } from '../../../_interfaces/isetting';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrls: ['./summary.css']
})
export class Summary implements OnInit {
  film = '';
  filmId: number = 0;
  seats: number[] = [];
  seatPrice = 0;
  partyDate: string = '';
  extras: any[] = [];
  total = 0;

  settingService = inject(Setting);
  private bookingService = inject(Booking);

  settings: ISetting[] = [];
  bookings: IBooking[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.film = params['film'];
      this.filmId = +params['filmId'] || 0;
      this.seats = params['seats']?.split(',').map((s: string) => +s) || [];
      this.seatPrice = +params['seatPrice'];
      this.partyDate = params['partyDate'] || '';
      this.total = +params['total'];
      this.extras = params['extras'] ? JSON.parse(params['extras']) : [];
    });

    this.settingService.getAllSettings().subscribe({
      next: (data) => {
        this.settings = Array.isArray(data) ? data : [data];
      },
      error: (err) => console.error('Error loading settings:', err)
    });
  }

  confirmBooking() {
    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Please login to complete booking');
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userStr);
    const bookingIds: number[] = [];
    const totalSeats = this.seats.length;
    let successful = 0;

    this.seats.forEach(seat => {
      const booking: IBooking = {
        price: this.seatPrice, // Price per seat, not total
        seat_number: seat,
        user_id: user.id,
        movie_id: this.filmId,
        party_date: this.partyDate,
        party_number: 'first'
      };

      this.bookingService.addBooking(booking).subscribe({
        next: (res: any) => {
          bookingIds.push(res.booking.id);
          successful++;

          if (successful === totalSeats) {
            console.log('All bookings created successfully');
            this.router.navigate(['/booking-success'], {
              queryParams: { ids: bookingIds.join(',') }
            });
          }
        },
        error: (err) => {
          console.error('Error adding booking:', err);
          alert('Error creating booking. Please try again.');
        }
      });
    });
  }
}
