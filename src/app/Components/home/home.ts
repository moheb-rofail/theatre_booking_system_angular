import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmService } from '../../_services/film';
import { IFilm } from '../../_interfaces/ifilm';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  films: IFilm[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit() {
    this.filmService.getFilms().subscribe((films) => {
      this.films = films;
      console.log(' Films loaded: ', this.films);
    });
  }

  trackById(index: number, film: IFilm) {
    return film.id;
  }

  selectFilm(film: IFilm) {
    console.log('🎬 Selected film:', film.title); 
    // the output in console when user selected film
  }
}
