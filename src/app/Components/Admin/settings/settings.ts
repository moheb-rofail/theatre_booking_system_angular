import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Setting } from '../../../_services/setting';
import { ISetting } from '../../../_interfaces/isetting';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./settings.css']
})
export class Settings implements OnInit {
  settingsForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  private settingService= inject(Setting);
  settings:ISetting[] = [];

  ngOnInit() {
    this.settingsForm = this.fb.group({
      ticket_price: [],
      popcorn_price: [''],
      cola_price: [''],
      total_seats: ['']
    });

    this.loadSettings();
  }

  loadSettings() {
    this.http.get<any>('http://localhost:8000/api/settings').subscribe(data => {
      this.settingsForm.patchValue(data);
    });
  }

  saveSettings() {
    var formData = this.settingsForm.value;
    this.http.post('http://localhost:8000/api/settings', formData)
      .subscribe(res => {
        console.log('Settings updated!', res);
      });
  }
}
