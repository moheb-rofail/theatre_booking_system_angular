import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timeout, catchError } from 'rxjs';
import { IFilm } from '../_interfaces/ifilm';

interface FilmResponse {
  current_page: number;
  data: IFilm[];
  last_page: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class Film {
  private apiUrl = 'http://127.0.0.1:8000/api/movies';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<IFilm[]> {
    console.log('Film service: Making request to', this.apiUrl);
    return this.http.get<IFilm[]>(this.apiUrl).pipe(
      timeout(10000), // 10 second timeout
      catchError((error: HttpErrorResponse | Error) => {
        console.error('Film service: HTTP Error:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Error Status:', error.status);
          console.error('Error Message:', error.message);
          console.error('Error Details:', error.error);
        } else {
          console.error('Error:', error.message);
        }
        return throwError(() => error);
      })
    );
  }

  getFilmById(id: number): Observable<IFilm> {
    return this.http.get<IFilm>(`${this.apiUrl}/${id}`);
  }

  addMovie(data: any) {
    return this.http.post(this.apiUrl, data).subscribe((data) => {
      console.log(data);
    });
  }
}
