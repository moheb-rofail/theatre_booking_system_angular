import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  imports: [ReactiveFormsModule],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {

  bookForm = new FormGroup({
    //party_date: new FormControl('', Validators.required),
    //party_time : new FormControl('', Validators.required),
    seat_number: new FormControl('', Validators.required),
    //extras: new FormControl('')
  });

  rows = 10; 
  cols = 5; 
  seats: { id: number, status: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      seat_number: ['']
    });

    for (let i = 1; i <= this.rows * this.cols; i++) {
      this.seats.push({ id: i, status: 'available' });
    }
  }

  selectSeat(seat: any) {
    if (seat.status === 'booked') return;

    this.bookForm.patchValue({ seat_number: seat.id });
    console.log('Selected seat:', seat);
  }

  order() {
    console.log('Form submitted:', this.bookForm.value);
  }
}
