import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ISetting } from '../_interfaces/isetting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Setting {
  http = inject(HttpClient);
  private SettingsSignal = signal<any>([]);

  constructor() {
    this.http
      .get<ISetting>('http://127.0.0.1:8000/api/settings/');
  }

  getAllSettings(): Observable<any>  {
    return this.http.get('http://127.0.0.1:8000/api/settings/');
  }

  updateSettings(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`http://127.0.0.1:8000/api/settings/`, data);
  }
}
