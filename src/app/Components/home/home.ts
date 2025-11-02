import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Film } from '../../_services/film';
import { IFilm } from '../../_interfaces/ifilm';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  films: IFilm[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private Film: Film, private router: Router) { }

  // return all films
  ngOnInit() {
    this.loading = true;
    this.error = null;
    this.films = [];
    console.log('Home component: Initializing, fetching films from API...');

    const subscription = this.Film.getFilms().pipe(
      finalize(() => {
        console.log('Home component: Request completed (finalize)');
        this.loading = false;
      })
    ).subscribe({
      next: (films) => {
        console.log('Home component: Films received:', films);
        console.log('Home component: Films type:', typeof films);
        console.log('Home component: Is array:', Array.isArray(films));

        if (films && Array.isArray(films)) {
          this.films = films;
          console.log(`Home component: Loaded ${films.length} movies`);
        } else if (films && typeof films === 'object' && 'data' in films) {
          // Handle paginated response
          this.films = (films as any).data || [];
          console.log(`Home component: Loaded ${this.films.length} movies from paginated response`);
        } else {
          console.warn('Home component: Unexpected response format:', films);
          this.films = [];
        }
      },
      error: (err) => {
        console.error('Home component: Error loading films:', err);
        console.error('Home component: Error status:', err?.status);
        console.error('Home component: Error message:', err?.message);
        console.error('Home component: Error details:', err?.error);

        if (err?.status === 0 || err?.message?.includes('timeout') || err?.message?.includes('Failed to fetch')) {
          this.error = 'Cannot connect to server. Please ensure: 1) Laravel API is running (php artisan serve), 2) Server is on http://127.0.0.1:8000';
        } else {
          this.error = `Failed to load movies: ${err?.message || err?.error?.message || 'Unknown error'}`;
        }
        this.films = [];
      },
      complete: () => {
        console.log('Home component: Subscription completed');
      }
    });
  }
  // use film.id in for loop in track index home.html
  trackById(index: number, film: IFilm) {
    return film.id;
  }

  // the output in console when user selected film
  selectFilm(film: IFilm) {
    this.router.navigate(['/book', film.id]);
    // console.log('Selected film:', film.title); 
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/default_poster.jpg';
  }
}
