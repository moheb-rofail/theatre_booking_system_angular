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
      .get<ISetting>('http://127.0.0.1:8000/api/settings/')
      .subscribe((data) => this.SettingsSignal.set(data));
  }

  getAllSettings() {
    return this.SettingsSignal;
  }

  updateSettings(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`http://127.0.0.1:8000/api/settings/`, data);
  }
}
