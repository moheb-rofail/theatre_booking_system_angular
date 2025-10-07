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
  seats: number[] = [];
  seatPrice = 0;
  extras: any[] = [];
  total = 0;

  settingService = inject(Setting);
  private bookingService = inject(Booking);

  settings: ISetting[] = [];
  bookings: IBooking[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);

      this.film = params['film'];
      this.seats = params['seats']?.split(',').map((s: string) => +s) || [];
      this.seatPrice = +params['seatPrice'];
      this.total = +params['total'];
      this.extras = params['extras'] ? JSON.parse(params['extras']) : [];

      // console.log('Film:', this.film);
      // console.log('Seats:', this.seats);
      // console.log('Extras:', this.extras);
      // console.log('Total:', this.total);
    });

    this.settingService.getAllSettings().subscribe({
      next: (data) => {
        this.settings = Array.isArray(data) ? data : [data];
        console.log('Settings loaded:', this.settings);
      },
      error: (err) => console.error('Error loading settings:', err)
    });
  }

  confirmBooking() {
    const bookingIds: number[] = [];
    const totalSeats = this.seats.length;
    let successful = 0;

    this.seats.forEach(seat => {
      const booking: IBooking = {
        price: this.total,
        seat_number: seat,
        user_id: 5,
        movie_id: 7,
        party_date: '2024-12-02',
        party_number: 'first'
      };

      this.bookingService.addBooking(booking).subscribe({
        next: (res: any) => {
          console.log('✅ Booking added:', res);
          bookingIds.push(res.booking.id);
          successful++;

          if (successful === totalSeats) {
            this.router.navigate(['/booking-success'], {
              queryParams: { ids: bookingIds.join(',') }
            });
          }
        },
        error: (err) => console.error('Error adding booking:', err)
      });
    });
  }

}
