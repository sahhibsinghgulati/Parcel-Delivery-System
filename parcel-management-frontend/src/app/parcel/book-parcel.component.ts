import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-book-parcel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="page-wrapper">
      <div class="navbar">
        <div class="nav-brand">📦 Book Parcel</div>
        <button class="back-btn" (click)="goBack()">← Back</button>
      </div>

      <div class="form-container">
        <h1>Book a New Parcel</h1>
        <form (ngSubmit)="submitForm()" class="booking-form">
          <div class="form-section">
            <h3>📍 Pickup Details</h3>
            <div class="form-group">
              <label>Pickup Address</label>
              <input type="text" [(ngModel)]="form.pickupAddress" name="pickupAddress" placeholder="Enter complete address" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>City</label>
                <input type="text" [(ngModel)]="form.pickupCity" name="pickupCity" required />
              </div>
              <div class="form-group">
                <label>Contact Number</label>
                <input type="text" [(ngModel)]="form.pickupContactInfo" name="pickupContactInfo" placeholder="10 digit number" required />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>📦 Package Details</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Weight (kg)</label>
                <input type="number" [(ngModel)]="form.weight" name="weight" (change)="calculateCost()" required />
              </div>
              <div class="form-group">
                <label>Pickup Date</label>
                <input type="date" [(ngModel)]="form.pickupDate" name="pickupDate" required />
              </div>
            </div>
            <div class="cost-display">
              <p>Total Cost: <strong>₹{{ estimatedCost }}</strong></p>
              <small>(Rate: ₹5 per kg)</small>
            </div>
          </div>

          <div class="form-section">
            <h3>📍 Drop Details</h3>
            <div class="form-group">
              <label>Drop Location</label>
              <input type="text" [(ngModel)]="form.dropLocation" name="dropLocation" placeholder="Enter complete address" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>City</label>
                <input type="text" [(ngModel)]="form.dropCity" name="dropCity" required />
              </div>
              <div class="form-group">
                <label>Contact Number</label>
                <input type="text" [(ngModel)]="form.dropContactInfo" name="dropContactInfo" placeholder="10 digit number" required />
              </div>
            </div>
          </div>

          <button type="submit" class="submit-btn">Proceed to Payment</button>
        </form>

        <p *ngIf="message" [ngClass]="messageType" class="message">{{ message }}</p>
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

    .back-btn:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    .form-container {
      max-width: 700px;
      margin: 30px auto;
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .form-container h1 {
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
      grid-template-columns: 1fr 1fr;
      gap: 20px;
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

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 5px rgba(102, 126, 234, 0.2);
    }

    .cost-display {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
    }

    .cost-display p {
      margin: 0;
      font-size: 18px;
    }

    .cost-display small {
      color: #999;
    }

    .submit-btn {
      width: 100%;
      padding: 15px;
      margin-top: 20px;
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
export class BookParcelComponent implements OnInit {
  form: any = {
    pickupAddress: '',
    pickupCity: '',
    pickupContactInfo: '',
    dropLocation: '',
    dropCity: '',
    dropContactInfo: '',
    weight: 0,
    pickupDate: ''
  };
  estimatedCost = 0;
  message = '';
  messageType = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    if (!localStorage.getItem('basicAuth')) {
      this.router.navigate(['/login']);
    }
  }

  calculateCost() {
    this.estimatedCost = this.form.weight * 5;
  }

  submitForm() {
    this.http.post(`${environment.apiUrl}/parcels`, this.form).subscribe({
      next: (response: any) => {
        this.message = `✓ Parcel booked! Tracking ID: ${response.trackingId}`;
        this.messageType = 'success';
        setTimeout(() => this.router.navigate(['/user/manage-orders']), 2000);
      },
      error: () => {
        this.message = '✗ Failed to book parcel';
        this.messageType = 'error';
      }
    });
  }

  goBack() {
    this.router.navigate(['/user-dashboard']);
  }
}

