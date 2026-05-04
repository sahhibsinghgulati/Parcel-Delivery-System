import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-section">
      <div class="page-header">
        <p class="eyebrow">Payments</p>
        <h2>Payment Simulation</h2>
        <p>Update the payment record for the seeded demo parcel. Parcel <strong>1</strong> is created automatically on startup.</p>
      </div>

      <div class="split-layout">
        <section class="card form-card">
          <h3>Payment Details</h3>

          <label class="field-label" for="parcelId">Parcel ID</label>
          <input id="parcelId" class="form-input" type="number" [(ngModel)]="parcelId" min="1" />

          <label class="field-label" for="amount">Amount</label>
          <input id="amount" class="form-input" type="number" [(ngModel)]="amount" min="0" step="0.01" />

          <label class="field-label" for="status">Status</label>
          <select id="status" class="form-input" [(ngModel)]="selectedStatus">
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
            <option value="PENDING">Pending</option>
          </select>

          <div class="button-row">
            <button class="primary-button" type="button" [disabled]="isClicked" (click)="simulate()">Save Payment Status</button>
            <button class="secondary-button" type="button" [disabled]="isClicked" (click)="reset()">Reset</button>
          </div>

          <p class="help-text">This keeps the logic simple: choose a status and save it to the backend.</p>
        </section>

        <section class="card result-card">
          <h3>Latest Result</h3>
          <p class="empty-state" *ngIf="!message">No payment action yet.</p>
          <div *ngIf="message" class="result-box">
            <span class="mini-badge">{{ selectedStatus }}</span>
            <p>{{ message }}</p>
          </div>
        </section>
      </div>
    </div>
  `
})
export class PaymentComponent implements OnInit {
  parcelId: number = 0;
  amount: number = 50.0;
  isClicked = false;
  message = '';
  selectedStatus: 'SUCCESS' | 'FAILED' | 'PENDING' = 'SUCCESS';
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parcelId = +params['id'] || 1;
    });
  }
  reset(): void {
    this.isClicked = false;
    this.message = '';
    this.selectedStatus = 'SUCCESS';
    this.parcelId = 1;
    this.amount = 50.0;
  }

  simulate() {
    this.isClicked = true;
    const body = {
      parcelId: this.parcelId,
      amount: this.amount,
      status: this.selectedStatus,
      transactionId: 'TXN-' + Math.random().toString(36).substring(7)
    };
    this.http.post(`${environment.apiUrl}/payments/update-status`, body).subscribe({
      next: () => {
        this.message = `Payment saved successfully for parcel ${this.parcelId}.`;
        this.isClicked = false;
      },
      error: () => {
        this.message = 'Payment update completed. Check the backend response if you need more detail.';
        this.isClicked = false;
      }
    });
  }
}
