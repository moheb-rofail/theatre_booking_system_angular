import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, KeyValuePipe],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  regForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    imageURL: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    address: new FormGroup({
      city: new FormControl(''),
      street: new FormControl(''),
    }),
  });

  get firstName() {
    return this.regForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.regForm.get('lastName') as FormControl;
  }
  get imageURL() {
    return this.regForm.get('imageURL') as FormControl;
  }
  get email() {
    return this.regForm.get('email') as FormControl;
  }
  get username() {
    return this.regForm.get('username') as FormControl;
  }
  get password() {
    return this.regForm.get('password') as FormControl;
  }

  register() {

  }
}