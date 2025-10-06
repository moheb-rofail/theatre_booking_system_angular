import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../_services/auth';

@Component({
  selector: 'app-user-nav',
  imports: [RouterLink],
  templateUrl: './user-nav.html',
  styleUrl: './user-nav.css'
})
export class UserNav {
    authService = inject(AuthService);
    user = this.authService.currentUser;
    isAdmin = () => this.authService.isAdmin();
    isLoggedIn = () => this.authService.isLoggedIn();
}
