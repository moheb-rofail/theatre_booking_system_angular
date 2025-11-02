import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Film } from '../../../_services/film';
import { IFilm } from '../../../_interfaces/ifilm';
import { Booking } from '../../../_services/booking';
import { Setting } from '../../../_services/setting';

@Component({
  selector: 'app-book',
  imports: [CommonModule],
  templateUrl: './book.html',
  styleUrls: ['./book.css']
})
export class Book implements OnInit {
  filmId!: number;
  film?: IFilm;
  seats: number[] = [];
  selectedSeats: number[] = [];
  seatPrice: number = 100; // price of the seat
  partyDate: string = '';
  loadingSeats: boolean = false;

  bookingService = inject(Booking);
  settingService = inject(Setting);
  bookedSeats: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private Film: Film) { }

  ngOnInit() {
    this.filmId = Number(this.route.snapshot.paramMap.get('id'));  // get film ID from Link

    // Set default date to today or get from query params if provided
    const today = new Date();
    this.partyDate = this.route.snapshot.queryParamMap.get('date') ||
      today.toISOString().split('T')[0];

    // Load ticket price from settings
    this.loadTicketPrice();

    // Get film details
    this.Film.getFilmById(this.filmId).subscribe({
      next: (data) => {
        this.film = data;
        this.loadBookedSeats(); // Load booked seats after getting film
      },
      error: (err) => {
        console.error('Error loading film:', err);
      }
    });

    this.seats = Array.from({ length: 50 }, (_, i) => i + 1);      // Created Array of 50 seats
  }

  loadTicketPrice() {
    this.settingService.getAllSettings().subscribe({
      next: (response: any) => {
        const values = response.values || {};
        this.seatPrice = values.ticket_price || 100;
      },
      error: (err) => {
        console.error('Error loading ticket price:', err);
      }
    });
  }

  loadBookedSeats() {
    this.loadingSeats = true;
    this.bookingService.getBookedSeats(this.partyDate, this.filmId).subscribe({
      next: (data) => {
        this.bookedSeats = Array.isArray(data) ? data : [];
        console.log('Booked seats for movie', this.filmId, 'on', this.partyDate, ':', this.bookedSeats);
        this.loadingSeats = false;
      },
      error: (err) => {
        console.error('Error fetching seats:', err);
        this.bookedSeats = [];
        this.loadingSeats = false;
      }
    });
  }

  toggleSeat(seat: number) {

    if (this.isSeatBooked(seat)) {       // prevent user from selecting already booked seat
      alert('This seat is already booked!');
      return;
    }

    let index = this.selectedSeats.indexOf(seat);
    if (index > -1) this.selectedSeats.splice(index, 1); // when user click on selected seat, it will be unselected
    else this.selectedSeats.push(seat);
  }

  confirmBooking() {

    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat!');
      return;
    }

    this.router.navigate(['/extras'], {
      queryParams: {
        film: this.film?.title,
        filmId: this.filmId,
        seats: this.selectedSeats.join(','),
        seatPrice: this.seatPrice,
        partyDate: this.partyDate
      }
    });
  }

  isSeatBooked(seatNumber: number): boolean {
    return this.bookedSeats.includes(seatNumber);
  }
}
