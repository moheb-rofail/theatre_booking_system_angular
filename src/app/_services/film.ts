import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {}

  getFilms(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getFilmById(id: number): Observable<IFilm> {
    return this.http.get<IFilm>(`${this.apiUrl}/${id}`);
  }

  addMovie(data: any){
    return this.http.post(this.apiUrl, data).subscribe((data) => {
      console.log(data);
    });
  }
}
