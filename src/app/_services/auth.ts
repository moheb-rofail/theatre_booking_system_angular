import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../_interfaces/iuser';
import { LoginResponse } from '../_interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  currentUser = signal<LoginResponse['user'] | null>(null);
  loggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) {}
  login(credentials: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        this.currentUser.set(res.user);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.loggedIn.set(true);
        this.router.navigate(['']);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        alert('بيانات الدخول غير صحيحة');
        return throwError(() => error);
      })
    );
  }

  isLoggedIn() {
    return this.loggedIn();
  }

  isAdmin(): boolean {
    const user = this.currentUser() ?? JSON.parse(localStorage.getItem('user') || 'null');
    return !!user?.is_admin;
  }

  // التسجيل
  register(userData: { name: string; email: string; password: string;}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response.token) {
            this.currentUser.set(response.user);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.loggedIn.set(true);
            this.router.navigate(['']);
          }
          //this.currentUser.next(response.user);
        })
      );
  }

  // تسجيل الخروج
  logout(): Observable<void> {
    return this.http.post<void>(
    `${this.apiUrl}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.currentUser.set(null);
          this.loggedIn.set(false);
          this.router.navigate(['/login']);
        })
      );
  }

  // جلب بيانات المستخدم الحالي
  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/user`);
  }
}