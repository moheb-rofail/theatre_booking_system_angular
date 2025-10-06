import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  router = inject(Router);
  authService = inject(AuthService);
  user = {
    email: '',
    password: ''
  }

  login(user:any){
    this.authService.login({email: user.email, password:user.password}).subscribe(res => {
      });
  }
}
