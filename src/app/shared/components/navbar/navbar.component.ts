import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav
      class="navbar navbar-expand-lg fixed-top aurora-navbar"
      [class.aurora-navbar-scrolled]="scrolled"
    >
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2" routerLink="/">
          <div class="logo-mark d-flex align-items-center justify-content-center">
            <span class="logo-letter">A</span>
          </div>
          <span class="fw-semibold brand-text">
            Aurora Art Expo
          </span>
        </a>

        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/artworks" routerLinkActive="active"
                >Collection</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/exhibitions" routerLinkActive="active"
                >Exhibitions</a
              >
            </li>
            <li class="nav-item d-none d-lg-block">
              <a class="nav-link" routerLink="/about" routerLinkActive="active">About</a>
            </li>
            <li class="nav-item d-none d-lg-block">
              <a class="nav-link" routerLink="/contact" routerLinkActive="active"
                >Contact</a
              >
            </li>

            <li class="nav-item d-none d-lg-block ms-lg-2">
              <button
                class="btn btn-sm btn-outline-light rounded-pill gradient-pill px-3 border-0 shadow-sm"
                routerLink="/artworks"
              >
                <i class="bi bi-ticket-perforated-fill me-1"></i>
                Get tickets
              </button>
            </li>

            <ng-container *ngIf="authService.isAuthenticated(); else guestLinks">
              <li class="nav-item ms-lg-3">
                <a
                  class="btn btn-sm btn-outline-light rounded-pill px-3"
                  routerLink="/admin"
                >
                  <i class="bi bi-speedometer2 me-1"></i>
                  Admin
                </a>
              </li>
              <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                <button
                  class="btn btn-sm btn-outline-danger rounded-pill px-3"
                  (click)="authService.logout()"
                >
                  Logout
                </button>
              </li>
            </ng-container>

            <ng-template #guestLinks>
              <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
                <a
                  class="btn btn-sm btn-outline-light rounded-pill px-3"
                  routerLink="/login"
                >
                  <i class="bi bi-person-lock me-1"></i>
                  Admin login
                </a>
              </li>
            </ng-template>

            <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button
                class="btn btn-sm btn-ghost d-flex align-items-center gap-1 rounded-pill"
                type="button"
                (click)="themeService.toggleTheme()"
              >
                <i
                  class="bi"
                  [ngClass]="themeService.isDark() ? 'bi-sun-fill' : 'bi-moon-stars-fill'"
                ></i>
                <span class="d-none d-md-inline">
                  {{ themeService.isDark() ? 'Light' : 'Dark' }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .aurora-navbar {
        backdrop-filter: blur(22px);
        background: radial-gradient(
            circle at top left,
            rgba(251, 191, 36, 0.08),
            transparent 55%
          ),
          rgba(15, 23, 42, 0.9);
        border-bottom: 1px solid rgba(148, 163, 184, 0.25);
        transition: background 200ms ease, transform 150ms ease, box-shadow 150ms ease;
      }

      .aurora-navbar-scrolled {
        box-shadow: 0 14px 30px rgba(15, 23, 42, 0.6);
        background: rgba(15, 23, 42, 0.96);
      }

      .logo-mark {
        width: 32px;
        height: 32px;
        border-radius: 0.9rem;
        background: radial-gradient(circle at 10% 0, #facc15, #f97316 45%, #0ea5e9 90%);
        box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8), 0 0 18px rgba(248, 250, 252, 0.25);
      }

      .logo-letter {
        font-weight: 900;
        font-size: 1.1rem;
        color: #020617;
      }

      .brand-text {
        letter-spacing: 0.12em;
        font-size: 0.8rem;
        text-transform: uppercase;
      }

      .nav-link {
        font-size: 0.86rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: rgba(226, 232, 240, 0.75);
        position: relative;
        padding-inline: 0.9rem !important;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        left: 0.9rem;
        right: 0.9rem;
        bottom: 0.2rem;
        height: 2px;
        border-radius: 999px;
        background: linear-gradient(90deg, #facc15, #22d3ee);
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 160ms ease-out;
      }

      .nav-link:hover {
        color: #f9fafb !important;
      }

      .nav-link.active {
        color: #fefce8 !important;
      }

      .nav-link.active::after {
        transform: scaleX(1);
      }

      @media (max-width: 991.98px) {
        .navbar-nav {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  scrolled = false;

  constructor(public authService: AuthService, public themeService: ThemeService) {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 10;
  }
}
