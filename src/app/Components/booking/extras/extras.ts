import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Setting } from '../../../_services/setting';

interface ExtraOption {
  name: string;
  price: number;
  quantity: number;
  icon?: string;
  key?: string;
}

@Component({
  selector: 'app-extras',
  imports: [CommonModule, FormsModule],
  templateUrl: './extras.html',
  styleUrls: ['./extras.css']
})
export class Extras implements OnInit {
  filmTitle = '';
  filmId: number = 0;
  selectedSeats: number[] = [];
  seatPrice = 0;
  totalSeatsCost = 0;
  partyDate: string = '';
  extras: ExtraOption[] = [];

  settingService = inject(Setting);

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {  // get data from previous page
    this.route.queryParams.subscribe(params => {  // read data from URL

      this.filmTitle = params['film'];
      this.filmId = +params['filmId'] || 0;
      this.selectedSeats = params['seats']?.split(',').map((s: string) => +s) || [];
      this.seatPrice = +params['seatPrice'] || 0;
      this.partyDate = params['partyDate'] || '';
      this.totalSeatsCost = this.selectedSeats.length * this.seatPrice; // total price of selected seats

      // Initialize extras with default prices, will be updated from database
      this.extras = [
        { name: 'Popcorn', price: 50, quantity: 0, icon: '🍿', key: 'popcorn_price' },
        { name: 'Drink', price: 30, quantity: 0, icon: '🥤', key: 'drink_price' },
        { name: 'Chocolate', price: 25, quantity: 0, icon: '🍫', key: 'chocolate_price' }
      ];

      // Load actual prices from database
      this.loadExtrasPrices();
    });
  }

  loadExtrasPrices() {
    this.settingService.getAllSettings().subscribe({
      next: (response: any) => {
        const values = response.values || {};
        this.extras.forEach(extra => {
          if (extra.key && values[extra.key]) {
            extra.price = values[extra.key];
          }
        });
      },
      error: (err) => {
        console.error('Error loading extras prices:', err);
      }
    });
  }

  increaseQuantity(extra: ExtraOption) {
    extra.quantity++;
  }

  decreaseQuantity(extra: ExtraOption) {
    if (extra.quantity > 0) {
      extra.quantity--;
    }
  }

  getTotalCost() {
    let extrasTotal = this.extras
      .reduce((sum, e) => sum + (e.price * e.quantity), 0);
    return this.totalSeatsCost + extrasTotal;
  }

  confirmBooking() {
    let selectedExtras = this.extras.filter(e => e.quantity > 0);

    this.router.navigate(['/summary'], {
      queryParams: {
        film: this.filmTitle,
        filmId: this.filmId,
        seats: this.selectedSeats.join(','),  // send data to next page in url
        seatPrice: this.seatPrice,
        partyDate: this.partyDate,
        extras: JSON.stringify(selectedExtras), // convert array to string to send in url
        total: this.getTotalCost()
      }
    });
  }
}
