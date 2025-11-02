import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Film } from '../../../_services/film';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  router = inject(Router);

  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  previewUrl: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addAMovie() {
    if (this.movieForm.invalid) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('title', this.movieForm.value.title || '');
    formData.append('description', this.movieForm.value.description || '');
    formData.append('duration', this.movieForm.value.duration || '');
    formData.append('TypeOfFilm', this.movieForm.value.TypeOfFilm || '');

    if (this.selectedFile) {
      formData.append('poster', this.selectedFile);
    }

    this.http.post('http://127.0.0.1:8000/api/movies', formData).subscribe({
      next: (response: any) => {
        this.successMessage = '✅ Movie added successfully!';
        this.isLoading = false;
        this.movieForm.reset();
        this.selectedFile = null;
        this.previewUrl = null;

        // Redirect after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Error adding movie. Please try again.';
        this.isLoading = false;
      }
    });
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
