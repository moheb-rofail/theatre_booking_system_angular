import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPaginatedBookings } from '../_interfaces/IPaginatedBookings';
import { IBooking } from '../_interfaces/ibooking';

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
      .subscribe((data) => {
        this.BookingsSignal.set(data);
      });
  }

  getAllBookings() {
    return this.BookingsSignal;
  }

  getBooking(id: number): Observable<IBooking> {
    return this.http.get<IBooking>(`http://127.0.0.1:8000/api/bookings/${id}`);
  }

  addBooking(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`http://127.0.0.1:8000/api/bookings/`, data);
  }
}
