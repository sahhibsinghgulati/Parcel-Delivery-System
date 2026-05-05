import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { FilterPipe } from '../core/filter.pipe';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterPipe],
  template: `
    <div class="page-wrapper">
      <div class="navbar">
        <div class="nav-brand">📋 My Orders</div>
        <button class="back-btn" (click)="goBack()">← Back</button>
      </div>

      <div class="main-content">
        <div class="controls">
          <input type="text" placeholder="Search by tracking ID..." [(ngModel)]="searchTerm" class="search-input" />
          <button class="refresh-btn" (click)="loadParcels()">🔄 Refresh</button>
        </div>

        <div *ngIf="parcels.length > 0; else noParcels" class="table-wrapper">
          <table class="parcels-table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>To</th>
                <th>Weight</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let parcel of filteredParcels">
                <td>{{ parcel.trackingId }}</td>
                <td>{{ parcel.dropLocation }}</td>
                <td>{{ parcel.weight }} kg</td>
                <td>₹{{ parcel.cost }}</td>
                <td>
                  <span class="status-badge" [ngClass]="'status-' + parcel.status.toLowerCase()">
                    {{ parcel.status }}
                  </span>
                </td>
                <td>
                  <button class="action-btn view-btn" (click)="viewDetails(parcel)">View</button>
                  <button class="action-btn feedback-btn" (click)="openFeedback(parcel)">Feedback</button>
                  <button class="action-btn cancel-btn" *ngIf="parcel.status === 'CREATED'" (click)="cancelParcel(parcel)">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ng-template #noParcels>
          <div class="no-data">
            <p>No parcels found. <a href="javascript:void(0)" (click)="navigateTo('user/book-parcel')">Book one now!</a></p>
          </div>
        </ng-template>

        <div *ngIf="selectedParcel" class="modal" (click)="closeModal()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <button class="close-btn" (click)="closeModal()">×</button>
            <h2>{{ selectedParcel.trackingId }}</h2>
            <div class="details">
              <p><strong>From:</strong> {{ selectedParcel.pickupAddress }}, {{ selectedParcel.pickupCity }}</p>
              <p><strong>To:</strong> {{ selectedParcel.dropLocation }}, {{ selectedParcel.dropCity }}</p>
              <p><strong>Weight:</strong> {{ selectedParcel.weight }} kg</p>
              <p><strong>Cost:</strong> ₹{{ selectedParcel.cost }}</p>
              <p><strong>Status:</strong> {{ selectedParcel.status }}</p>
              <p><strong>Pickup Date:</strong> {{ selectedParcel.pickupDate }}</p>
            </div>
            <button class="modal-btn" (click)="downloadInvoice(selectedParcel)">📥 Download Invoice</button>
          </div>
        </div>

        <div *ngIf="showFeedbackForm" class="modal" (click)="closeFeedback()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <button class="close-btn" (click)="closeFeedback()">×</button>
            <h2>Submit Feedback</h2>
            <div class="feedback-form">
              <div class="form-group">
                <label>Rating (1-5)</label>
                <select [(ngModel)]="feedbackForm.rating">
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div class="form-group">
                <label>Comment</label>
                <textarea [(ngModel)]="feedbackForm.comment" placeholder="Share your experience..."></textarea>
              </div>
              <button class="modal-btn" (click)="submitFeedback()">Submit</button>
            </div>
            <p *ngIf="feedbackMessage" [ngClass]="feedbackMessageType" class="message">{{ feedbackMessage }}</p>
          </div>
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
      max-width: 1000px;
      margin: 30px auto;
      padding: 20px;
    }

    .controls {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .search-input {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 5px;
    }

    .refresh-btn {
      padding: 10px 20px;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }

    .table-wrapper {
      background: white;
      border-radius: 10px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      overflow-x: auto;
    }

    .parcels-table {
      width: 100%;
      border-collapse: collapse;
    }

    .parcels-table th,
    .parcels-table td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    .parcels-table th {
      background: #f5f5f5;
      font-weight: bold;
      color: #333;
    }

    .parcels-table tr:hover {
      background: #fafafa;
    }

    .status-badge {
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }

    .status-delivered {
      background: #d4edda;
      color: #155724;
    }

    .status-in_transit {
      background: #fff3cd;
      color: #856404;
    }

    .status-created {
      background: #d1ecf1;
      color: #0c5460;
    }

    .status-pending {
      background: #e7d4f5;
      color: #567a8a;
    }

    .action-btn {
      padding: 5px 10px;
      margin: 0 3px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
    }

    .view-btn {
      background: #667eea;
      color: white;
    }

    .feedback-btn {
      background: #28a745;
      color: white;
    }

    .cancel-btn {
      background: #dc3545;
      color: white;
    }

    .no-data {
      background: white;
      padding: 40px;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .no-data a {
      color: #667eea;
      text-decoration: none;
      font-weight: bold;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 10px;
      max-width: 500px;
      width: 90%;
      position: relative;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }

    .details {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      margin: 15px 0;
    }

    .details p {
      margin: 10px 0;
    }

    .modal-btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }

    .feedback-form .form-group {
      margin-bottom: 15px;
    }

    .feedback-form label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .feedback-form select,
    .feedback-form textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-sizing: border-box;
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
    }

    .message.error {
      background: #f8d7da;
      color: #721c24;
    }
  `]
})
export class ManageOrdersComponent implements OnInit {
  parcels: any[] = [];
  searchTerm = '';
  selectedParcel: any = null;
  showFeedbackForm = false;
  feedbackForm: any = { rating: 5, comment: '' };
  feedbackMessage = '';
  feedbackMessageType = '';
  feedbackParcelId = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadParcels();
  }

  get filteredParcels() {
    return this.parcels.filter(p =>
      p.trackingId.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  loadParcels() {
    this.http.get(`${environment.apiUrl}/parcels`).subscribe({
      next: (data: any) => {
        this.parcels = data;
      },
      error: () => alert('Failed to load parcels')
    });
  }

  viewDetails(parcel: any) {
    this.selectedParcel = parcel;
  }

  closeModal() {
    this.selectedParcel = null;
  }

  openFeedback(parcel: any) {
    this.feedbackParcelId = parcel.id;
    this.showFeedbackForm = true;
  }

  closeFeedback() {
    this.showFeedbackForm = false;
    this.feedbackForm = { rating: 5, comment: '' };
  }

  submitFeedback() {
    this.http.post(`${environment.apiUrl}/feedback`, {
      parcelId: this.feedbackParcelId,
      rating: this.feedbackForm.rating,
      comment: this.feedbackForm.comment
    }).subscribe({
      next: () => {
        this.feedbackMessage = '✓ Feedback submitted successfully';
        this.feedbackMessageType = 'success';
        setTimeout(() => this.closeFeedback(), 2000);
      },
      error: () => {
        this.feedbackMessage = '✗ Failed to submit feedback';
        this.feedbackMessageType = 'error';
      }
    });
  }

  downloadInvoice(parcel: any) {
    this.http.get(`${environment.apiUrl}/parcels/${parcel.id}/invoice`).subscribe({
      next: (invoice: any) => {
        const content = `Parcel Invoice\n\nTracking ID: ${invoice.trackingId}\nFrom: ${invoice.pickupAddress}\nTo: ${invoice.dropLocation}\nWeight: ${invoice.weight} kg\nCost: ₹${invoice.cost}\nStatus: ${invoice.status}`;
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', `invoice-${parcel.trackingId}.txt`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      },
      error: () => alert('Failed to download invoice')
    });
  }

  cancelParcel(parcel: any) {
    const reason = prompt('Enter cancellation reason:');
    if (reason) {
      this.http.post(`${environment.apiUrl}/parcels/${parcel.id}/cancel`, { reason }).subscribe({
        next: () => {
          alert('Parcel cancelled successfully');
          this.loadParcels();
        },
        error: () => alert('Failed to cancel parcel')
      });
    }
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  goBack() {
    this.router.navigate(['/user-dashboard']);
  }
}


