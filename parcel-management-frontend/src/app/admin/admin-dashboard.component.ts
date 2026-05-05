import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { FilterPipe } from '../core/filter.pipe';
import { CountByStatusPipe } from '../core/count-by-status.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, CountByStatusPipe],
  template: `
    <div class="dashboard-container">
      <nav class="navbar">
        <div class="nav-brand">📦 Admin Panel</div>
        <div class="nav-right">
          <span class="username">{{ username }}</span>
          <button class="logout-btn" (click)="logout()">Logout</button>
        </div>
      </nav>

      <div class="dashboard-wrapper">
        <aside class="sidebar">
          <ul class="nav-menu">
            <li><a href="javascript:void(0)" [ngClass]="{'active': activeTab === 'home'}" (click)="switchTab('home')">📊 Dashboard</a></li>
            <li><a href="javascript:void(0)" [ngClass]="{'active': activeTab === 'orders'}" (click)="switchTab('orders')">📋 All Orders</a></li>
            <li><a href="javascript:void(0)" [ngClass]="{'active': activeTab === 'book'}" (click)="switchTab('book')">📮 Book for User</a></li>
          </ul>
        </aside>

        <main class="main-content">
          <div *ngIf="activeTab === 'home'" class="tab-content">
            <h1>Admin Dashboard 👑</h1>
            <p>Manage all parcels and users</p>
            <div class="stats-grid">
              <div class="stat-card">
                <h3>Total Parcels</h3>
                <p class="stat-number">{{ parcels.length }}</p>
              </div>
              <div class="stat-card">
                <h3>Delivered</h3>
                <p class="stat-number">{{ (parcels | countByStatus: 'DELIVERED') }}</p>
              </div>
              <div class="stat-card">
                <h3>In Transit</h3>
                <p class="stat-number">{{ (parcels | countByStatus: 'IN_TRANSIT') }}</p>
              </div>
              <div class="stat-card">
                <h3>Pending</h3>
                <p class="stat-number">{{ (parcels | countByStatus: 'PENDING') }}</p>
              </div>
            </div>
          </div>

          <div *ngIf="activeTab === 'orders'" class="tab-content">
            <h2>All Orders</h2>
            <div class="table-controls">
              <input type="text" placeholder="Search by tracking ID..." [(ngModel)]="searchTerm" class="search-input" />
              <button class="refresh-btn" (click)="loadParcels()">🔄 Refresh</button>
            </div>
            <div class="table-responsive">
              <table class="parcels-table" *ngIf="parcels.length > 0; else noData">
                <thead>
                  <tr>
                    <th>Tracking ID</th>
                    <th>Sender</th>
                    <th>Drop Location</th>
                    <th>Weight (kg)</th>
                    <th>Cost</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let parcel of parcels | filter: searchTerm">
                    <td>{{ parcel.trackingId }}</td>
                    <td>{{ parcel.sender }}</td>
                    <td>{{ parcel.dropLocation }}</td>
                    <td>{{ parcel.weight }}</td>
                    <td>₹{{ parcel.cost }}</td>
                    <td>
                      <select [(ngModel)]="parcel.status" (change)="updateStatus(parcel)" class="status-select" [ngClass]="'status-' + parcel.status.toLowerCase()">
                        <option value="CREATED">Created</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN_TRANSIT">In Transit</option>
                        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td><button class="action-btn" (click)="viewDetails(parcel)">View</button></td>
                  </tr>
                </tbody>
              </table>
              <ng-template #noData>
                <p class="no-data">No parcels found</p>
              </ng-template>
            </div>
          </div>

          <div *ngIf="activeTab === 'book'" class="tab-content">
            <h2>Book Parcel for User</h2>
            <form (ngSubmit)="bookParcelForUser()" class="booking-form">
              <div class="form-group">
                <label>Pickup Address</label>
                <input type="text" [(ngModel)]="bookForm.pickupAddress" name="pickupAddress" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Pickup City</label>
                  <input type="text" [(ngModel)]="bookForm.pickupCity" name="pickupCity" required />
                </div>
                <div class="form-group">
                  <label>Pickup Contact</label>
                  <input type="text" [(ngModel)]="bookForm.pickupContactInfo" name="pickupContactInfo" required />
                </div>
              </div>
              <div class="form-group">
                <label>Drop Location</label>
                <input type="text" [(ngModel)]="bookForm.dropLocation" name="dropLocation" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Drop City</label>
                  <input type="text" [(ngModel)]="bookForm.dropCity" name="dropCity" required />
                </div>
                <div class="form-group">
                  <label>Drop Contact</label>
                  <input type="text" [(ngModel)]="bookForm.dropContactInfo" name="dropContactInfo" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Weight (kg)</label>
                  <input type="number" [(ngModel)]="bookForm.weight" name="weight" required />
                </div>
                <div class="form-group">
                  <label>Pickup Date</label>
                  <input type="date" [(ngModel)]="bookForm.pickupDate" name="pickupDate" required />
                </div>
              </div>
              <button type="submit" class="submit-btn">Book Parcel</button>
            </form>
            <p *ngIf="bookMessage" [ngClass]="bookMessageType" class="message">{{ bookMessage }}</p>
          </div>
        </main>
      </div>

      <footer class="footer">
        <p>&copy; 2026 Parcel Management System. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #f5f5f5;
    }

    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-brand {
      font-size: 24px;
      font-weight: bold;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .logout-btn {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.3);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .logout-btn:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    .dashboard-wrapper {
      flex: 1;
      display: flex;
    }

    .sidebar {
      width: 250px;
      background: white;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
      padding: 20px 0;
    }

    .nav-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-menu a {
      display: block;
      padding: 15px 20px;
      color: #333;
      text-decoration: none;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;
      cursor: pointer;
    }

    .nav-menu a:hover,
    .nav-menu a.active {
      background: #f0f0f0;
      border-left-color: #667eea;
      color: #667eea;
    }

    .main-content {
      flex: 1;
      padding: 30px;
      overflow-y: auto;
    }

    .tab-content {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }

    .stat-number {
      font-size: 36px;
      font-weight: bold;
      margin: 10px 0 0 0;
    }

    .table-responsive {
      margin-top: 20px;
      overflow-x: auto;
    }

    .parcels-table {
      width: 100%;
      border-collapse: collapse;
    }

    .parcels-table th,
    .parcels-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .parcels-table th {
      background: #f5f5f5;
      font-weight: bold;
      color: #333;
    }

    .parcels-table tr:hover {
      background: #fafafa;
    }

    .status-select {
      padding: 5px 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
    }

    .status-select.status-delivered {
      color: green;
    }

    .status-select.status-in_transit {
      color: orange;
    }

    .status-select.status-pending {
      color: blue;
    }

    .action-btn {
      padding: 5px 10px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .action-btn:hover {
      background: #5568d3;
    }

    .booking-form {
      margin-top: 20px;
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

    .submit-btn {
      padding: 12px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }

    .submit-btn:hover {
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }

    .message {
      margin-top: 15px;
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

    .footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: auto;
    }

    .table-controls {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .search-input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .refresh-btn {
      padding: 10px 20px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .refresh-btn:hover {
      background: #5568d3;
    }

    .no-data {
      text-align: center;
      color: #999;
      padding: 20px;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  username = '';
  activeTab = 'home';
  parcels: any[] = [];
  searchTerm = '';
  bookForm: any = {
    pickupAddress: '',
    pickupCity: '',
    pickupContactInfo: '',
    dropLocation: '',
    dropCity: '',
    dropContactInfo: '',
    weight: 0,
    pickupDate: ''
  };
  bookMessage = '';
  bookMessageType = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'Admin';
    this.loadParcels();
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'orders') {
      this.loadParcels();
    }
  }

  loadParcels() {
    this.http.get(`${environment.apiUrl}/parcels/admin/all`).subscribe({
      next: (data: any) => {
        this.parcels = data;
      },
      error: () => alert('Failed to load parcels')
    });
  }

  updateStatus(parcel: any) {
    this.http.put(`${environment.apiUrl}/parcels/admin/${parcel.id}/status`, { status: parcel.status }).subscribe({
      next: () => alert('Status updated successfully'),
      error: () => alert('Failed to update status')
    });
  }

  bookParcelForUser() {
    this.http.post(`${environment.apiUrl}/parcels`, this.bookForm).subscribe({
      next: () => {
        this.bookMessage = 'Parcel booked successfully!';
        this.bookMessageType = 'success';
        this.bookForm = { pickupAddress: '', pickupCity: '', pickupContactInfo: '', dropLocation: '', dropCity: '', dropContactInfo: '', weight: 0, pickupDate: '' };
        setTimeout(() => this.bookMessage = '', 3000);
      },
      error: () => {
        this.bookMessage = 'Failed to book parcel';
        this.bookMessageType = 'error';
      }
    });
  }

  viewDetails(parcel: any) {
    alert(`Tracking ID: ${parcel.trackingId}\nStatus: ${parcel.status}\nCost: ₹${parcel.cost}`);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}


