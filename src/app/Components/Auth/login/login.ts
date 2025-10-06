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
    username: '',
    password: ''
  }

  login(user:any){
    // console.log(user.username);
    // console.log(user.password);
    // console.log(this.authService.login({username: user.username, password: user.password}));
    if(this.authService.login({username: user.username, password: user.password})) {
      localStorage.setItem('auth', 'true');
      //this.router.navigate(['']);
    }
  }
}
