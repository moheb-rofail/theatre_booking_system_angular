import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
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
  }

  confirmBooking() {
    this.router.navigate(['/success']); // Done of reservation
  }
}
