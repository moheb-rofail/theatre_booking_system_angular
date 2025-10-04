import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Film } from '../../../_services/film';
import { IFilm } from '../../../_interfaces/ifilm';

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

  constructor(private route: ActivatedRoute, private router: Router, private Film: Film) {}

  ngOnInit() {
    this.filmId = Number(this.route.snapshot.paramMap.get('id'));  // get film ID from Link

    this.Film.getFilmById(this.filmId).subscribe((data) => {       // get film by ID from Api service film.ts 
      this.film = data;
    });
    this.seats = Array.from({ length: 50 }, (_, i) => i + 1);      // Created Array of 50 seats
  }

  toggleSeat(seat: number) {
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
}
