import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserNav } from './Components/user-nav/user-nav';
import { AdminNav } from './Components/Admin/admin-nav/admin-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserNav, AdminNav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project');
}
