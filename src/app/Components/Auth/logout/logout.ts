import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout implements OnInit{
  authService = inject(AuthService);
  ngOnInit() {
    this.authService.logout().subscribe({
      next: () => console.log('User logged out'),
      error: err => console.error('Logout error:', err)
    });
  }
}
