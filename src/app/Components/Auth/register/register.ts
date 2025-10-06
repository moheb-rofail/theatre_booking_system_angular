import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, KeyValuePipe],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  regForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });


  get email() {
    return this.regForm.get('email') as FormControl;
  }
  get name() {
    return this.regForm.get('name') as FormControl;
  }
  get password() {
    return this.regForm.get('password') as FormControl;
  }

  authService = inject(AuthService);
  register() {
    this.authService.register({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    }).subscribe(res => {
      console.log(res);
    });
  }
}