import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <nav class="navbar">
        <div class="nav-brand">📦 Parcel Management System</div>
        <div class="nav-right">
          <span class="username">{{ username }}</span>
          <button class="logout-btn" (click)="logout()">Logout</button>
        </div>
      </nav>

      <div class="dashboard-wrapper">
        <aside class="sidebar">
          <ul class="nav-menu">
            <li><a href="javascript:void(0)" (click)="navigateTo('user-dashboard')" class="active">📊 Dashboard</a></li>
            <li><a href="javascript:void(0)" (click)="navigateTo('user/book-parcel')">📮 Book Parcel</a></li>
            <li><a href="javascript:void(0)" (click)="navigateTo('user/track-parcel')">🔍 Track Parcel</a></li>
            <li><a href="javascript:void(0)" (click)="navigateTo('user/manage-orders')">📋 My Orders</a></li>
            <li><a href="javascript:void(0)" (click)="navigateTo('user/profile')">👤 Profile</a></li>
          </ul>
        </aside>

        <main class="main-content">
          <div class="welcome-section">
            <h1>Welcome, {{ username }}! 👋</h1>
            <p>Manage your parcels efficiently from your dashboard</p>
          </div>

          <div class="quick-actions">
            <div class="action-card" (click)="navigateTo('user/book-parcel')">
              <div class="action-icon">📮</div>
              <h3>Book New Parcel</h3>
              <p>Start shipping a new parcel today</p>
            </div>
            <div class="action-card" (click)="navigateTo('user/track-parcel')">
              <div class="action-icon">🔍</div>
              <h3>Track Parcel</h3>
              <p>Find your parcel status</p>
            </div>
            <div class="action-card" (click)="navigateTo('user/manage-orders')">
              <div class="action-icon">📋</div>
              <h3>View Orders</h3>
              <p>See all your booked parcels</p>
            </div>
            <div class="action-card" (click)="navigateTo('user/profile')">
              <div class="action-icon">👤</div>
              <h3>Edit Profile</h3>
              <p>Update your details</p>
            </div>
          </div>

          <div class="info-section">
            <h2>Quick Info</h2>
            <div class="info-grid">
              <div class="info-box">
                <h4>📦 Active Parcels</h4>
                <p class="big-number">0</p>
              </div>
              <div class="info-box">
                <h4>✅ Delivered</h4>
                <p class="big-number">0</p>
              </div>
              <div class="info-box">
                <h4>⏳ In Transit</h4>
                <p class="big-number">0</p>
              </div>
            </div>
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

    .username {
      font-weight: bold;
    }

    .logout-btn {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.3);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
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

    .nav-menu li {
      margin: 0;
    }

    .nav-menu a {
      display: block;
      padding: 15px 20px;
      color: #333;
      text-decoration: none;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;
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

    .welcome-section {
      margin-bottom: 40px;
    }

    .welcome-section h1 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .welcome-section p {
      color: #999;
      margin: 0;
    }

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .action-card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
    }

    .action-card:hover {
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px);
    }

    .action-icon {
      font-size: 48px;
      margin-bottom: 15px;
    }

    .action-card h3 {
      margin: 15px 0 10px 0;
      color: #333;
    }

    .action-card p {
      color: #999;
      margin: 0;
    }

    .info-section {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .info-section h2 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #333;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .info-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }

    .info-box h4 {
      margin: 0 0 10px 0;
    }

    .big-number {
      font-size: 36px;
      font-weight: bold;
      margin: 0;
    }

    .footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: auto;
    }

    .footer p {
      margin: 0;
    }
  `]
})
export class UserDashboardComponent implements OnInit {
  username = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'User';
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

