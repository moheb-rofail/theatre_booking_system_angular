import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadCurrentUser();
  }

  // تسجيل الدخول
  login(credentials: { username: string; password: string }) {
    //console.log(credentials);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
    .subscribe((data) => {
        console.log(data);
      });
      // .pipe(
      //   tap(response => {
      //     console.log(response);
      //     if (response.token) {
      //       localStorage.setItem('token', response.token);
      //     }
      //     this.currentUserSubject.next(response.user);
      //     console.log(response);
      //   })
      // );
      
  }

  // التسجيل
  register(userData: { name: string; email: string; password: string; password_confirmation: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          this.currentUserSubject.next(response.user);
        })
      );
  }

  // تسجيل الخروج
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          this.currentUserSubject.next(null);
          this.router.navigate(['/login']);
        })
      );
  }

  // جلب بيانات المستخدم الحالي
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`);
  }

  // تحميل بيانات المستخدم عند بدء التطبيق
  private loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.getCurrentUser().subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => {
          localStorage.removeItem('token');
          this.currentUserSubject.next(null);
        }
      });
    }
  }

  // التحقق إذا كان المستخدم مسجل الدخول
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}