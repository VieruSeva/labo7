import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Artwork } from '../../core/models/artwork.model';
import { Artist } from '../../core/models/artist.model';
import { Exhibition } from '../../core/models/exhibition.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- HERO -->
    <header class="hero-wrapper">
      <div class="hero-bg"></div>
      <div class="hero-overlay hero-overlay-gradient"></div>

      <div class="container position-relative z-1">
        <div class="row align-items-center gy-4">
          <div class="col-lg-6">
            <span class="badge-soft badge-soft-primary mb-3 d-inline-flex align-items-center gap-2">
              <i class="bi bi-stars"></i>
              New season · Luminescence
            </span>

            <h1 class="display-3 fw-bold display-heading mb-3">
              Experience the boundary between
              <span class="text-warning">light</span> and
              <span class="text-info">shadow</span>.
            </h1>

            <p class="lead mb-4 text-muted-soft">
              Aurora Art Expo blends physical installations with digital experiments.
              Discover artworks that live between reality and code.
            </p>

            <div class="d-flex flex-wrap gap-3 mb-4">
              <a
                routerLink="/artworks"
                class="btn btn-lg btn-primary rounded-pill px-4 d-inline-flex align-items-center gap-2"
              >
                <i class="bi bi-images"></i>
                Browse collection
              </a>
              <a
                routerLink="/contact"
                class="btn btn-lg btn-ghost rounded-pill px-4 d-inline-flex align-items-center gap-2"
              >
                <i class="bi bi-headset"></i>
                Book a curator tour
              </a>
            </div>

            <div class="d-flex flex-wrap gap-3 align-items-center small text-muted-soft">
              <div class="d-flex align-items-center gap-2">
                <div class="avatar-stack">
                  <span class="avatar-circle"></span>
                  <span class="avatar-circle"></span>
                  <span class="avatar-circle"></span>
                </div>
                <span>Over 40+ visitors in this virtual demo.</span>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="glass-card hero-card hover-elevate fade-in-up">
              <div class="row g-0 align-items-stretch">
                <div class="col-sm-7 p-4">
                  <p class="section-heading mb-2">Tonight in the gallery</p>
                  <h2 class="h4 fw-semibold mb-3">Immersive night session</h2>
                  <p class="small text-muted-soft mb-4">
                    Step into a curated route of the most luminous pieces, guided by dynamic
                    lighting and sound design.
                  </p>

                  <ul class="list-unstyled small mb-4">
                    <li class="mb-1">
                      <i class="bi bi-clock me-1 text-warning"></i> 19:00 – 22:00 (demo)
                    </li>
                    <li class="mb-1">
                      <i class="bi bi-geo-alt me-1 text-warning"></i> Aurora Gallery · West Wing
                    </li>
                    <li>
                      <i class="bi bi-vr me-1 text-warning"></i> Optional virtual companion route
                    </li>
                  </ul>

                  <div class="d-flex flex-wrap gap-2">
                    <span class="badge-soft">No real tickets required</span>
                    <span class="badge-soft">
                      <i class="bi bi-lightning-charge-fill me-1 text-warning"></i> In-memory API
                    </span>
                  </div>
                </div>
                <div class="col-sm-5 position-relative">
                  <div class="hero-thumbnail">
                    <img
                      src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80"
                      alt="Aurora Gallery"
                      class="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div class="hero-mini-card">
                    <p class="mb-1 small text-muted-soft">Live stats</p>
                    <div class="d-flex gap-3 small">
                      <div>
                        <div class="fw-bold">{{ artworksCount }}</div>
                        <div class="text-muted-soft">Artworks</div>
                      </div>
                      <div>
                        <div class="fw-bold">{{ artistsCount }}</div>
                        <div class="text-muted-soft">Artists</div>
                      </div>
                      <div>
                        <div class="fw-bold">{{ exhibitionsCount }}</div>
                        <div class="text-muted-soft">Exhibitions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- THEMES / TAGS -->
    <section class="section-padding">
      <div class="container">
        <div class="row align-items-end mb-4">
          <div class="col-md-7">
            <p class="section-heading mb-1">Explore by mood</p>
            <h2 class="h3 mb-2">Curated experiences</h2>
            <p class="text-muted-soft mb-0">
              Pick a theme that resonates with your visitors – a simple way to show how filters
              and tags work in Angular.
            </p>
          </div>
        </div>

        <div class="d-flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            *ngFor="let theme of trendingThemes"
            class="btn btn-sm btn-ghost rounded-pill px-3"
          >
            <i class="bi bi-hash me-1"></i>{{ theme }}
          </button>
        </div>

        <div class="row g-4">
          <div class="col-md-4" *ngFor="let item of themeCards">
            <div class="soft-card p-4 hover-elevate h-100">
              <div class="d-flex justify-content-between mb-3">
                <div class="badge-soft">
                  <i class="bi" [ngClass]="item.icon"></i>
                  {{ item.label }}
                </div>
                <span class="small text-muted-soft">{{ item.duration }}</span>
              </div>
              <h3 class="h5 mb-2">{{ item.title }}</h3>
              <p class="small text-muted-soft mb-3">
                {{ item.description }}
              </p>
              <div class="d-flex align-items-center justify-content-between small">
                <span class="text-muted-soft">
                  <i class="bi bi-people me-1"></i> {{ item.spots }} spots
                </span>
                <a routerLink="/artworks" class="text-decoration-none small">
                  View route <i class="bi bi-arrow-right-short"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED ARTWORKS -->
    <section class="section-padding pt-0">
      <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-3">
          <div>
            <p class="section-heading mb-1">Spotlight pieces</p>
            <h2 class="h3 mb-0">Featured masterpieces</h2>
          </div>
          <a routerLink="/artworks" class="small text-muted-soft">
            View full collection <i class="bi bi-arrow-right-short"></i>
          </a>
        </div>

        <div class="row g-4">
          <div class="col-md-4" *ngFor="let art of featuredArtworks">
            <article class="soft-card hover-elevate h-100 d-flex flex-column overflow-hidden">
              <div class="position-relative">
                <img
                  [src]="art.imageUrl"
                  [alt]="art.title"
                  class="w-100 object-fit-cover"
                  style="height: 260px"
                />
                <span class="badge-soft badge-soft-primary position-absolute top-0 start-0 m-3">
                  Featured
                </span>
                <button
                  type="button"
                  class="btn btn-sm btn-light rounded-pill position-absolute bottom-0 end-0 m-3 px-3"
                  routerLink="/artworks"
                >
                  Details
                </button>
              </div>
              <div class="p-3 d-flex flex-column flex-grow-1">
                <h3 class="h6 mb-1">{{ art.title }}</h3>
                <p class="small text-muted-soft mb-2">
                  {{ art.year }} · {{ art.medium }}
                </p>
                <p class="small text-muted-soft mb-3">
                 {{ art.description | slice : 0 : 110 }}{{ (art.description?.length || 0) > 110 ? '…' : '' }}

                </p>
                <div class="mt-auto d-flex justify-content-between align-items-center small">
                  <span
                    class="fw-semibold"
                    *ngIf="art.price !== null; else displayOnly"
                  >
                    {{ art.price | currency }}
                  </span>
                  <ng-template #displayOnly>
                    <span class="text-muted-soft fst-italic">Display only</span>
                  </ng-template>
                  <a
                    [routerLink]="['/artworks']"
                    class="text-decoration-none small d-inline-flex align-items-center gap-1"
                  >
                    View artwork
                    <i class="bi bi-arrow-right-short"></i>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER / CTA -->
    <section class="section-padding pt-0 pb-5">
      <div class="container">
        <div class="glass-card p-4 p-md-5">
          <div class="row align-items-center gy-3">
            <div class="col-md-7">
              <p class="section-heading mb-2">Stay in the loop</p>
              <h2 class="h4 mb-2">Receive curator notes and new lab updates</h2>
              <p class="small text-muted-soft mb-0">
                This is just a front-end demo – but for your teacher, it looks like a real
                newsletter opt-in section.
              </p>
            </div>
            <div class="col-md-5">
              <form class="d-flex flex-column flex-sm-row gap-2">
                <input
                  type="email"
                  class="form-control"
                  placeholder="you@example.com"
                  aria-label="Email address"
                />
                <button type="button" class="btn btn-primary rounded-pill px-4">
                  Notify me
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simple back-to-top button -->
    <button class="back-to-top" type="button" (click)="scrollTop()">
      <i class="bi bi-arrow-up-short fs-4"></i>
    </button>
  `,
  styles: [
    `
      .hero-wrapper {
        position: relative;
        min-height: 80vh;
        display: flex;
        align-items: center;
        overflow: hidden;
      }

      .hero-bg {
        position: absolute;
        inset: 0;
        background: url('https://images.unsplash.com/photo-1545235617-9465c4b8baad?auto=format&fit=crop&w=1920&q=80')
          center/cover no-repeat;
        opacity: 0.28;
      }

      .hero-overlay {
        position: absolute;
        inset: 0;
      }

      .hero-card {
        max-width: 640px;
        margin-left: auto;
      }

      .hero-thumbnail {
        position: absolute;
        inset: 0.75rem;
        border-radius: 1.1rem;
        overflow: hidden;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.9);
      }

      .hero-mini-card {
        position: absolute;
        bottom: 0.9rem;
        left: 0.9rem;
        right: 0.9rem;
        padding: 0.65rem 0.9rem;
        border-radius: 0.9rem;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid rgba(148, 163, 184, 0.4);
      }

      .avatar-stack {
        display: inline-flex;
      }

      .avatar-circle {
        width: 24px;
        height: 24px;
        border-radius: 999px;
        background: radial-gradient(circle at 0 0, #facc15, #ec4899);
        border: 2px solid #020617;
        box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.4);
        margin-left: -8px;
      }

      .avatar-circle:first-child {
        margin-left: 0;
        background: radial-gradient(circle at 0 0, #22c55e, #3b82f6);
      }

      .avatar-circle:last-child {
        background: radial-gradient(circle at 0 0, #a855f7, #ec4899);
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  featuredArtworks: Artwork[] = [];
  artworksCount = 0;
  artistsCount = 0;
  exhibitionsCount = 0;

  trendingThemes = ['Light & Shadow', 'Digital Futures', 'Sculpture', 'New Media', 'Generative Art'];

  themeCards = [
    {
      label: 'Slow looking',
      icon: 'bi-eye',
      duration: '25 min route',
      title: 'Listen to the light',
      description: 'A meditative path through three key pieces focused on reflection, water and time.',
      spots: 'Small groups',
    },
    {
      label: 'Digital night',
      icon: 'bi-cpu',
      duration: '35 min route',
      title: 'Algorithmic dreams',
      description: 'Explore the digital pieces and discover how algorithms become visual poetry.',
      spots: 'VR optional',
    },
    {
      label: 'Sculpture focus',
      icon: 'bi-box',
      duration: '20 min route',
      title: 'Mass & Void',
      description: 'A short route around our sculptural works, ideal as an intro to the expo.',
      spots: 'Walk-in',
    },
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAll<Artwork>('artworks').subscribe((data) => {
      this.artworksCount = data.length;
      this.featuredArtworks = data.filter((a) => a.isFeatured).slice(0, 3);
    });

    this.api.getAll<Artist>('artists').subscribe((data) => (this.artistsCount = data.length));
    this.api.getAll<Exhibition>('exhibitions').subscribe((data) => (this.exhibitionsCount = data.length));
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
