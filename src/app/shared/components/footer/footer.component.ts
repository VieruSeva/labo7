import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="py-5 mt-auto">
      <div class="container">
        <div class="row align-items-center gy-3">
          <div class="col-md-6">
            <p class="mb-1 small text-muted-soft">
              © 2025 Aurora Art Expo. Curated digital & physical exhibitions.
            </p>
            <p class="mb-0 small text-muted-soft">
              Built for learning Angular · In-memory backend · Demo only.
            </p>
          </div>
          <div class="col-md-6 d-flex justify-content-md-end justify-content-start gap-3">
            <a href="#" class="text-muted-soft hover-icon" aria-label="Instagram">
              <i class="bi bi-instagram fs-5"></i>
            </a>
            <a href="#" class="text-muted-soft hover-icon" aria-label="Twitter">
              <i class="bi bi-twitter-x fs-5"></i>
            </a>
            <a href="#" class="text-muted-soft hover-icon" aria-label="Facebook">
              <i class="bi bi-facebook fs-5"></i>
            </a>
            <a href="#" class="text-muted-soft hover-icon" aria-label="YouTube">
              <i class="bi bi-youtube fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .hover-icon:hover {
        color: #e5e7eb !important;
      }
    `,
  ],
})
export class FooterComponent {}
