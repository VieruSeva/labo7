import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Standalone imports used in the template
  imports: [
    RouterOutlet,
    NgIf,
    NavbarComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar></app-navbar>

    <main class="app-main">
      <router-outlet></router-outlet>
    </main>

    <button
      *ngIf="showScrollTop"
      class="scroll-top-btn"
      type="button"
      (click)="scrollToTop()"
      aria-label="Scroll back to top"
    >
      <i class="bi bi-arrow-up-short"></i>
    </button>

    <app-footer></app-footer>
  `
})
export class AppComponent {
  showScrollTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollTop = window.scrollY > 320;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
