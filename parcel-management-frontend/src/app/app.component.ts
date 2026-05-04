import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="site-header">
        <div class="brand-block">
          <div class="brand-mark">PMS</div>
          <div>
            <div class="brand-title">Parcel Management System</div>
            <div class="brand-subtitle">Beginner-friendly demo project</div>
          </div>
        </div>

        <nav class="site-nav">
          <a routerLink="/login">Login</a>
          <a routerLink="/dashboard">Dashboard</a>
          <a routerLink="/payment/1">Payment Demo</a>
          <button *ngIf="isLoggedIn()" type="button" (click)="logout()">Logout</button>
        </nav>
      </header>

      <section class="info-banner">
        <span class="info-pill">Demo accounts available</span>
        <span>Use <strong>admin / admin123</strong> or <strong>user / user123</strong> to sign in.</span>
      </section>

      <main class="site-main">
        <router-outlet></router-outlet>
      </main>

      <footer class="site-footer">
        <p>Parcel Management System • Clean starter UI for learning Spring Boot + Angular</p>
      </footer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('basicAuth');
  }

  logout(): void {
    localStorage.removeItem('basicAuth');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}

