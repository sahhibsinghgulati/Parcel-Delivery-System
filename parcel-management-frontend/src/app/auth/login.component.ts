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
    <div class="login-container">
      <div class="navbar">
        <div class="navbar-brand">📦 Parcel Management System</div>
      </div>
      <div class="login-content">
        <div class="login-card">
          <h2>Sign In</h2>
          <p class="subtitle">Enter your credentials or use demo accounts</p>
          
          <div class="demo-section">
            <p><strong>Demo Accounts:</strong></p>
            <button type="button" class="demo-btn user-demo" (click)="useDemo('user')">👤 User Demo</button>
            <button type="button" class="demo-btn admin-demo" (click)="useDemo('admin')">👨‍💼 Admin Demo</button>
            <div class="credentials">
              <small>User: user / user123</small>
              <small>Admin: admin / admin123</small>
            </div>
          </div>

          <form (ngSubmit)="login()">
            <div class="form-group">
              <label for="username">Username</label>
              <input id="username" type="text" [(ngModel)]="username" name="username" placeholder="Enter username" />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" type="password" [(ngModel)]="password" name="password" placeholder="Enter password" />
            </div>

            <button type="submit" class="login-btn">Sign In</button>
          </form>

          <p class="register-link">Don't have an account? <a href="javascript:void(0)" (click)="goToRegister()">Sign Up</a></p>

          <p *ngIf="successMessage" class="message success">✓ {{ successMessage }}</p>
          <p *ngIf="errorMessage" class="message error">✗ {{ errorMessage }}</p>
        </div>
      </div>
      <div class="footer">
        <p>&copy; 2026 Parcel Management System. All rights reserved.</p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .navbar {
      background: rgba(0, 0, 0, 0.5);
      padding: 20px;
      color: white;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }

    .login-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 400px;
    }

    .login-card h2 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #333;
    }

    .subtitle {
      color: #999;
      margin-bottom: 30px;
      font-size: 14px;
    }

    .demo-section {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }

    .demo-section p {
      margin: 0 0 10px 0;
      font-weight: bold;
    }

    .demo-btn {
      width: 100%;
      padding: 10px;
      margin: 5px 0;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    .user-demo {
      background: #667eea;
      color: white;
    }

    .user-demo:hover {
      background: #5568d3;
    }

    .admin-demo {
      background: #764ba2;
      color: white;
    }

    .admin-demo:hover {
      background: #653b8f;
    }

    .credentials {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
    }

    .credentials small {
      color: #666;
      font-size: 12px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 5px rgba(102, 126, 234, 0.2);
    }

    .login-btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .login-btn:hover {
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }

    .message {
      margin-top: 15px;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
    }

    .message.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .message.error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .footer {
      background: rgba(0, 0, 0, 0.5);
      color: white;
      text-align: center;
      padding: 20px;
    }

    .footer p {
      margin: 0;
    }

    .register-link {
      text-align: center;
      margin-top: 20px;
      color: #666;
      font-size: 14px;
    }

    .register-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
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
    } else {
      this.username = 'user';
      this.password = 'user123';
    }
  }

  login() {
    this.successMessage = '';
    this.errorMessage = '';

    const creds = btoa(`${this.username}:${this.password}`);
    localStorage.setItem('basicAuth', creds);
    localStorage.setItem('username', this.username);

    this.http.post(`${environment.apiUrl}/auth/login`, {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        localStorage.setItem('userRole', response.role);
        this.successMessage = 'Login successful. Redirecting...';

        setTimeout(() => {
          if (response.role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
        }, 1000);
      },
      error: () => {
        localStorage.removeItem('basicAuth');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}


