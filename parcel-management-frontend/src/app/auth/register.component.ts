import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="register-container">
      <div class="navbar">
        <div class="navbar-brand">📦 Parcel Management System</div>
      </div>
      <div class="register-content">
        <div class="register-card">
          <h2>Create Account</h2>
          <p class="subtitle">Join our parcel delivery network</p>
          
          <form (ngSubmit)="register()">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input 
                id="name" 
                type="text" 
                [(ngModel)]="formData.name" 
                name="name" 
                placeholder="Enter your full name"
                required 
              />
              <small class="error" *ngIf="errors.name">{{ errors.name }}</small>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                id="email" 
                type="email" 
                [(ngModel)]="formData.email" 
                name="email" 
                placeholder="Enter your email"
                required 
              />
              <small class="error" *ngIf="errors.email">{{ errors.email }}</small>
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input 
                id="phone" 
                type="tel" 
                [(ngModel)]="formData.phone" 
                name="phone" 
                placeholder="Enter 10-digit phone number"
                pattern="[0-9]{10}"
                required 
              />
              <small class="error" *ngIf="errors.phone">{{ errors.phone }}</small>
            </div>

            <div class="form-group">
              <label for="address">Address</label>
              <textarea 
                id="address" 
                [(ngModel)]="formData.address" 
                name="address" 
                placeholder="Enter your street address"
                rows="3"
                required
              ></textarea>
              <small class="error" *ngIf="errors.address">{{ errors.address }}</small>
            </div>

            <div class="form-group">
              <label for="username">Username</label>
              <input 
                id="username" 
                type="text" 
                [(ngModel)]="formData.username" 
                name="username" 
                placeholder="3-20 characters (alphanumeric and underscore)"
                required 
              />
              <small class="hint">3-20 characters, alphanumeric and underscore only</small>
              <small class="error" *ngIf="errors.username">{{ errors.username }}</small>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input 
                id="password" 
                type="password" 
                [(ngModel)]="formData.password" 
                name="password" 
                placeholder="At least 8 characters (uppercase, lowercase, special char)"
                required 
              />
              <small class="hint">Minimum 8 characters with uppercase, lowercase, and special character</small>
              <small class="error" *ngIf="errors.password">{{ errors.password }}</small>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input 
                id="confirmPassword" 
                type="password" 
                [(ngModel)]="formData.confirmPassword" 
                name="confirmPassword" 
                placeholder="Re-enter your password"
                required 
              />
              <small class="error" *ngIf="errors.confirmPassword">{{ errors.confirmPassword }}</small>
            </div>

            <button type="submit" class="register-btn">Create Account</button>
          </form>

          <p class="login-link">Already have an account? <a href="javascript:void(0)" (click)="goToLogin()">Sign In</a></p>

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
    .register-container {
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

    .register-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .register-card {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .register-card h2 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #333;
    }

    .subtitle {
      color: #999;
      margin-bottom: 30px;
      font-size: 14px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
      font-size: 14px;
    }

    input, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
      box-sizing: border-box;
      font-family: inherit;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 5px rgba(102, 126, 234, 0.2);
    }

    .hint {
      display: block;
      color: #999;
      font-size: 12px;
      margin-top: 3px;
    }

    .error {
      display: block;
      color: #dc3545;
      font-size: 12px;
      margin-top: 3px;
      font-weight: bold;
    }

    .register-btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 16px;
    }

    .register-btn:hover {
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
      color: #666;
      font-size: 14px;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    .message {
      margin-top: 15px;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;
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
  `]
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  errors: any = {};
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  validateForm(): boolean {
    this.errors = {};

    // Name validation
    if (!this.formData.name || this.formData.name.trim().length === 0) {
      this.errors.name = 'Full name is required';
    }

    // Email validation
    const emailPattern = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!this.formData.email || !emailPattern.test(this.formData.email)) {
      this.errors.email = 'Valid email is required';
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;
    if (!this.formData.phone || !phonePattern.test(this.formData.phone)) {
      this.errors.phone = 'Phone must be exactly 10 digits';
    }

    // Address validation
    if (!this.formData.address || this.formData.address.trim().length === 0) {
      this.errors.address = 'Address is required';
    }

    // Username validation
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    if (!this.formData.username || !usernamePattern.test(this.formData.username)) {
      this.errors.username = 'Username must be 3-20 characters (alphanumeric and underscore)';
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;
    if (!this.formData.password || !passwordPattern.test(this.formData.password)) {
      this.errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and special character';
    }

    // Confirm password validation
    if (this.formData.password !== this.formData.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
    }

    return Object.keys(this.errors).length === 0;
  }

  register(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.validateForm()) {
      this.errorMessage = 'Please fix the errors above';
      return;
    }

    const registerRequest = {
      username: this.formData.username,
      password: this.formData.password,
      email: this.formData.email,
      name: this.formData.name,
      phone: this.formData.phone,
      address: this.formData.address,
      role: 'ROLE_USER'
    };

    this.http.post(`${environment.apiUrl}/auth/register`, registerRequest).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

