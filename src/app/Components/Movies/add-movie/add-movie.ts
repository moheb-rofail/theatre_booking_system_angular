import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Film } from '../../../_services/film';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-movie',
  imports: [JsonPipe, KeyValuePipe, ReactiveFormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.css'
})
export class AddMovie {
  movieForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required),
    duration: new FormControl('', [Validators.required]),
    TypeOfFilm: new FormControl('', [Validators.required])
  });

  movieService = inject(Film);
  http = inject(HttpClient);
  addAMovie(data:any){
    this.movieService.addMovie(data);
  }

  get title() {
    return this.movieForm.get('title') as FormControl;
  }

  get description() {
    return this.movieForm.get('description') as FormControl;
  }

  get duration() {
    return this.movieForm.get('duration') as FormControl;
  }

  get TypeOfFilm() {
    return this.movieForm.get('TypeOfFilm') as FormControl;
  }
}
