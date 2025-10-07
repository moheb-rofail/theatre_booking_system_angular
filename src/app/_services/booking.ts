import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IBooking } from '../_interfaces/ibooking';
import { IPaginatedBookings } from '../_interfaces/IPaginatedBookings';

@Injectable({
  providedIn: 'root',
})
export class Booking {

  http = inject(HttpClient);
  private BookingsSignal = signal<any>([]);
  private userBookingsSignal = signal<any>([]);

  constructor() {
    this.http
      .get<IPaginatedBookings>('http://127.0.0.1:8000/api/bookings/')
      .subscribe((data) => this.BookingsSignal.set(data));
  }

  getAllBookings() {
    return this.BookingsSignal;
  }

  getBooking(id: number): Observable<IBooking> {
    return this.http.get<IBooking>(`http://127.0.0.1:8000/api/bookings/${id}`);
  }

  addBooking(data: any): Observable<any> {
    console.log('Sending booking: ', data);
    return this.http.post(`http://127.0.0.1:8000/api/bookings/`, data);
  }

  deleteBooking(id: number): Observable<any> {
    console.log('Deleting booking with ID:', id);
    return this.http.delete(`http://127.0.0.1:8000/api/bookings/${id}`);
  }

  getBookedSeats(party_date: string, movie_id: number) {
    return this.http.get(`http://127.0.0.1:8000/api/booked_seats/${party_date}/${movie_id}`);
  }

  getUserBookings(userId: number): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(`http://127.0.0.1:8000/api/user_bookings/${userId}`);
  }
}
