import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor: Intercepting request to', req.url);
    const token = localStorage.getItem('token');

    if (token) {
      console.log('AuthInterceptor: Adding Bearer token to request');
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    console.log('AuthInterceptor: No token found, proceeding without auth');
    return next.handle(req);
  }
}