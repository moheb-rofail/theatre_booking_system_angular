import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ExtraOption {
  name: string;
  price: number;
  selected: boolean;
  icon?: string;
}

@Component({
  selector: 'app-extras',
  imports: [CommonModule, FormsModule],
  templateUrl: './extras.html',
  styleUrls: ['./extras.css']
})
export class Extras implements OnInit {
  filmTitle = '';
  selectedSeats: number[] = [];
  seatPrice = 0;
  totalSeatsCost = 0;
  extras: ExtraOption[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {  // get data from previous page
      this.route.queryParams.subscribe(params => {  // read data from URL

      this.filmTitle = params['film'];
      this.selectedSeats = params['seats']?.split(',').map((s: string) => +s) || [];
      this.seatPrice = +params['seatPrice'] || 0;
      this.totalSeatsCost = this.selectedSeats.length * this.seatPrice; // total price of selected seats

      this.extras = [
        { name: 'Popcorn', price: 50, selected: false, icon: '🍿'  },
        { name: 'Drink', price: 30, selected: false, icon: '🥤' },
        { name: 'Chocolate', price: 25, selected: false, icon: '🍫' }
      ];
    });
  }

  toggleExtra(extra: ExtraOption) {
    extra.selected = !extra.selected;
  }

  getTotalCost() {
    let extrasTotal = this.extras
      .filter(e => e.selected)           // get selected extras
      .reduce((sum, e) => sum + e.price, 0);    // to calculate total price of selected extras
    return this.totalSeatsCost + extrasTotal;
  }

  confirmBooking() {
    let selectedExtras = this.extras.filter(e => e.selected);

    this.router.navigate(['/summary'], {
      queryParams: {
        film: this.filmTitle,
        seats: this.selectedSeats.join(','),  // send data to next page in url
        seatPrice: this.seatPrice,
        extras: JSON.stringify(selectedExtras), // convert array to string to send in url
        total: this.getTotalCost()
      }
    });
  }
}
