import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNav } from './Components/Admin/admin-nav/admin-nav';
import { UserNav } from "./Components/user-nav/user-nav";
import { AuthService } from './_services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminNav, UserNav],
  templateUrl: './app.html',
})
export class App {
  authService = inject(AuthService);
  user = this.authService.currentUser;
  isAdmin = () => this.authService.isAdmin();
  isLoggedIn = () => this.authService.isLoggedIn();
}

