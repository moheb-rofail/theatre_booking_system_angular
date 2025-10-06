import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Film } from '../../_services/film';
import { IFilm } from '../../_interfaces/ifilm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  films: IFilm[] = [];

  constructor(private Film: Film, private router: Router) {}

    // return all films
  ngOnInit() { 
    this.Film.getFilms().subscribe((films) => {   
      this.films = films;  
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
}
