import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Booking } from '../../../_services/booking';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-success.html',
  styleUrls: ['./booking-success.css']
})
export class BookingSuccess implements OnInit {
  private bookingService = inject(Booking);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  bookingIds: number[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const ids = params['ids']?.split(',').map((id: string) => +id) || [];
      this.bookingIds = ids;
      // console.log('Bookings to manage:', this.bookingIds);
    });
  }

  cancelBooking() {
    if (this.bookingIds.length === 0) return;
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    const deleteRequests = this.bookingIds.map(id => this.bookingService.deleteBooking(id));

    forkJoin(deleteRequests).subscribe({
      next: () => {
        alert('Booking cancelled successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error cancelling bookings:', err)
    });
  }
}
