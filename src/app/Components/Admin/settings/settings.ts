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

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  private settingService = inject(Setting);
  settings: ISetting[] = [];

  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit() {
    this.settingsForm = this.fb.group({
      ticket_price: [0],
      popcorn_price: [0],
      drink_price: [0],
      chocolate_price: [0]
    });

    this.loadSettings();
  }

  loadSettings() {
    this.settingService.getAllSettings().subscribe({
      next: (response: any) => {
        const values = response.values || {};
        this.settingsForm.patchValue({
          ticket_price: values.ticket_price || 100,
          popcorn_price: values.popcorn_price || 50,
          drink_price: values.drink_price || 30,
          chocolate_price: values.chocolate_price || 25
        });
      },
      error: (error) => {
        console.error('Error loading settings:', error);
      }
    });
  }

  saveSettings() {
    this.errorMessage = '';
    this.successMessage = '';

    this.settingService.updateSettings(this.settingsForm.value).subscribe({
      next: (res) => {
        this.successMessage = '✅ Settings updated successfully!';
        console.log('Settings updated!', res);
      },
      error: (error) => {
        this.errorMessage = 'Error updating settings. Please try again.';
        console.error('Error updating settings:', error);
      }
    });
  }
}
