import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../_services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  router = inject(Router);
  userService = inject(User);
  user = {
    username: '',
    password: ''
  }

  login(user:any){
    console.log(user.username);
    console.log(user.password);
    console.log(this.userService.auth(user.username, user.password));
    if(this.userService.auth(user.username, user.password)) {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['']);
    }
  }
}
