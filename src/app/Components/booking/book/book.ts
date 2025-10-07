import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Film } from '../../../_services/film';
import { IFilm } from '../../../_interfaces/ifilm';
import { Booking } from '../../../_services/booking';

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

  bookingService = inject(Booking);
  bookedSeats:{}={};

  constructor(private route: ActivatedRoute, private router: Router, private Film: Film) {}

  ngOnInit() {
    this.filmId = Number(this.route.snapshot.paramMap.get('id'));  // get film ID from Link

    this.Film.getFilmById(this.filmId).subscribe((data) => {       // get film by ID from Api service film.ts 
      this.film = data;
    });
    this.seats = Array.from({ length: 50 }, (_, i) => i + 1);      // Created Array of 50 seats
  
    this.bookingService.getBookedSeats('2024-12-02', 1).subscribe({
      next: (data) => {
        this.bookedSeats = data;
        console.log('Booked seats:', this.bookedSeats);
      },
      error: (err) => console.error('Error fetching seats:', err)
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
    
    // if (this.selectedSeats.length === 0) return alert('Please select at least one seat!');
    
    this.router.navigate(['/extras'], {
      queryParams: {
        film: this.film?.title,
        seats: this.selectedSeats.join(','),
        seatPrice: this.seatPrice
      }
    });
  }

  isSeatBooked(seatNumber: number): boolean {
    if (!this.bookedSeats) {
      return false;
    }

    // If bookedSeats is an array of seat numbers
    if (Array.isArray(this.bookedSeats)) {
      return this.bookedSeats.includes(seatNumber);
    }
    
    // If bookedSeats is an object with seat numbers as keys
    if (typeof this.bookedSeats === 'object' && this.bookedSeats !== null) {
      return this.bookedSeats.hasOwnProperty(seatNumber.toString());
    }
    
    return false;
  }
}
