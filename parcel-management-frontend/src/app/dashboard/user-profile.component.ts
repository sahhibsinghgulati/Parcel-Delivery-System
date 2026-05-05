import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="page-wrapper">
      <div class="navbar">
        <div class="nav-brand">👤 My Profile</div>
        <button class="back-btn" (click)="goBack()">← Back</button>
      </div>

      <div class="main-content">
        <div class="profile-card" *ngIf="profile">
          <h1>Profile Information</h1>
          
          <form (ngSubmit)="updateProfile()" class="profile-form">
            <div class="form-section">
              <h3>Basic Information</h3>
              <div class="form-group">
                <label>Username</label>
                <input type="text" [value]="profile.username" disabled class="disabled"/>
              </div>
              <div class="form-group">
                <label>Role</label>
                <input type="text" [value]="profile.role" disabled class="disabled"/>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" [(ngModel)]="profile.email" name="email" placeholder="your@email.com" />
              </div>
            </div>

            <div class="form-section">
              <h3>Contact Information</h3>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" [(ngModel)]="profile.phone" name="phone" placeholder="10 digit number" />
              </div>
              <div class="form-group">
                <label>Address</label>
                <input type="text" [(ngModel)]="profile.address" name="address" placeholder="Street address" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>City</label>
                  <input type="text" [(ngModel)]="profile.city" name="city" placeholder="City" />
                </div>
                <div class="form-group">
                  <label>State</label>
                  <input type="text" [(ngModel)]="profile.state" name="state" placeholder="State" />
                </div>
                <div class="form-group">
                  <label>Pin Code</label>
                  <input type="text" [(ngModel)]="profile.zipCode" name="zipCode" placeholder="Zip code" />
                </div>
              </div>
            </div>

            <button type="submit" class="submit-btn">💾 Save Changes</button>
          </form>

          <p *ngIf="message" [ngClass]="messageType" class="message">{{ message }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .navbar {
      background: rgba(0, 0, 0, 0.3);
      color: white;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand {
      font-size: 24px;
      font-weight: bold;
    }

    .back-btn {
      padding: 10px 20px;
      background: rgba(255, 255, 255, 0.3);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .main-content {
      max-width: 700px;
      margin: 30px auto;
      padding: 20px;
    }

    .profile-card {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .profile-card h1 {
      margin-top: 0;
      color: #333;
    }

    .form-section {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }

    .form-section:last-of-type {
      border-bottom: none;
    }

    .form-section h3 {
      margin-top: 0;
      color: #667eea;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
    }

    .form-group input.disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 5px rgba(102, 126, 234, 0.2);
    }

    .submit-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .submit-btn:hover {
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }

    .message {
      margin-top: 20px;
      padding: 15px;
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
  `]
})
export class UserProfileComponent implements OnInit {
  profile: any = null;
  message = '';
  messageType = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.http.get(`${environment.apiUrl}/users/profile`).subscribe({
      next: (data: any) => {
        this.profile = data;
      },
      error: () => {
        this.message = '✗ Failed to load profile';
        this.messageType = 'error';
      }
    });
  }

  updateProfile() {
    this.http.put(`${environment.apiUrl}/users/profile`, {
      email: this.profile.email,
      phone: this.profile.phone,
      address: this.profile.address,
      city: this.profile.city,
      state: this.profile.state,
      zipCode: this.profile.zipCode
    }).subscribe({
      next: () => {
        this.message = '✓ Profile updated successfully';
        this.messageType = 'success';
        setTimeout(() => this.message = '', 3000);
      },
      error: () => {
        this.message = '✗ Failed to update profile';
        this.messageType = 'error';
      }
    });
  }

  goBack() {
    this.router.navigate(['/user-dashboard']);
  }
}

