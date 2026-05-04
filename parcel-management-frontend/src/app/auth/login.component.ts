import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="page-grid auth-grid">
      <section class="hero-card card">
        <p class="eyebrow">Welcome back</p>
        <h2>Sign in to manage parcels</h2>
        <p>
          This version is kept intentionally simple so it is easy to understand and follow.
          Use one of the demo accounts below to enter the system.
        </p>

        <div class="demo-list">
          <button type="button" class="ghost-button" (click)="useDemo('admin')">Use Admin Demo</button>
          <button type="button" class="ghost-button" (click)="useDemo('user')">Use User Demo</button>
        </div>

        <div class="demo-box">
          <strong>Demo credentials</strong>
          <p>Admin: <code>admin / admin123</code></p>
          <p>User: <code>user / user123</code></p>
        </div>
      </section>

      <section class="card auth-card">
        <h3>Login</h3>

        <label class="field-label" for="username">Username</label>
        <input id="username" class="form-input" [(ngModel)]="username" placeholder="Enter your username" />

        <label class="field-label" for="password">Password</label>
        <input id="password" class="form-input" type="password" [(ngModel)]="password" placeholder="Enter your password" />

        <div class="button-row">
          <button class="primary-button" type="button" (click)="login()">Login</button>
          <button class="secondary-button" type="button" (click)="clearForm()">Clear</button>
        </div>

        <p class="status-text success" *ngIf="successMessage">{{ successMessage }}</p>
        <p class="status-text error" *ngIf="errorMessage">{{ errorMessage }}</p>
      </section>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  successMessage = '';
  errorMessage = '';
  constructor(private http: HttpClient, private router: Router) {}

  useDemo(type: 'admin' | 'user'): void {
    if (type === 'admin') {
      this.username = 'admin';
      this.password = 'admin123';
      return;
    }

    this.username = 'user';
    this.password = 'user123';
  }

  clearForm(): void {
    this.username = '';
    this.password = '';
    this.successMessage = '';
    this.errorMessage = '';
  }

  login() {
    this.successMessage = '';
    this.errorMessage = '';

    const creds = btoa(`${this.username}:${this.password}`);
    localStorage.setItem('basicAuth', creds);
    this.http.post(`${environment.apiUrl}/auth/login`, { username: this.username, password: this.password }).subscribe({
      next: () => {
        localStorage.setItem('username', this.username);
        this.successMessage = 'Login successful. Redirecting to the dashboard...';
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        localStorage.removeItem('basicAuth');
        localStorage.removeItem('username');
        this.errorMessage = 'Login failed. Please check your username and password.';
      }
    });
  }
}
