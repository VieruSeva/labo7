import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

interface SimpleExhibition {
  id: number;
  title: string;
  subtitle: string;
  status: 'current' | 'upcoming' | 'past';
  dateRange: string;
  highlight: string;
  location: string;
  imageUrl: string;
}

@Component({
  selector: 'app-exhibitions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="exhibitions-page">

      <!-- HERO / CURRENT SEASON -->
      <section class="section-padding pb-4">
        <div class="container">
          <div class="row align-items-center gy-4">
            <div class="col-lg-6">
              <span class="badge-soft badge-soft-primary mb-3 d-inline-flex align-items-center gap-2">
                <i class="bi bi-activity"></i>
                Current season
              </span>

              <h1 class="display-5 fw-bold display-heading mb-3">
                <span class="text-warning">Luminescence</span> ·
                installation, sound & digital echoes
              </h1>

              <p class="lead text-muted-soft mb-3">
                The main exhibition of Aurora Art Expo explores how light, code and memory collide.
                Visitors move through rooms where physical objects and projected layers constantly
                rewrite the space around them.
              </p>

              <ul class="list-unstyled small text-muted-soft mb-4">
                <li class="mb-1">
                  <i class="bi bi-clock me-2 text-warning"></i>
                  14 February – 30 April 2025
                </li>
                <li class="mb-1">
                  <i class="bi bi-geo-alt me-2 text-warning"></i>
                  West Wing, Aurora Gallery
                </li>
                <li>
                  <i class="bi bi-ticket-perforated me-2 text-warning"></i>
                  Timed entry · Average route 45 minutes
                </li>
              </ul>

              <div class="d-flex flex-wrap gap-2 mb-3 small">
                <span class="badge-soft">Immersive light rooms</span>
                <span class="badge-soft">Generated visuals</span>
                <span class="badge-soft">Spatial sound</span>
                <span class="badge-soft">Physical sculptures</span>
              </div>

              <div class="d-flex flex-wrap gap-3">
                <a
                  routerLink="/artworks"
                  class="btn btn-primary rounded-pill px-4 d-inline-flex align-items-center gap-2"
                >
                  <i class="bi bi-images"></i>
                  View artworks from this season
                </a>
                <a
                  routerLink="/contact"
                  class="btn btn-ghost rounded-pill px-4 d-inline-flex align-items-center gap-2"
                >
                  <i class="bi bi-calendar3"></i>
                  Ask about guided tours
                </a>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="glass-card hover-elevate hero-exhibition-card">
                <div class="row g-0 align-items-stretch">
                  <div class="col-sm-7 p-4">
                    <p class="section-heading mb-2">Inside the route</p>
                    <h2 class="h5 mb-2">Three movements</h2>
                    <p class="small text-muted-soft mb-3">
                      Every visitor crosses three zones: reflection, distortion and after-image.
                      Each one combines physical objects with digital layers generated in real time.
                    </p>
                    <ol class="small text-muted-soft ps-3 mb-3">
                      <li class="mb-1">Room of delayed reflections</li>
                      <li class="mb-1">Corridor of shifting patterns</li>
                      <li>Final chamber with slow fading auroras</li>
                    </ol>
                    <p class="small text-muted-soft mb-0">
                      This page demonstrates how you can present rich curatorial content without any
                      real backend – everything runs on the in-memory API.
                    </p>
                  </div>
                  <div class="col-sm-5 position-relative">
                    <div class="hero-thumb-wrapper">
                      <img
                        src="https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=900&q=80"
                        alt="Luminescence exhibition"
                        class="w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div class="hero-thumb-label">
                      <p class="small mb-0 text-muted-soft">
                        {{ exhibitionsCount }} exhibitions in this demo database
                      </p>
                      <p class="small mb-0">Curated for your Angular project.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STATS STRIP -->
      <section class="pb-4">
        <div class="container">
          <div class="soft-card p-3 p-md-4">
            <div class="row text-center gy-3">
              <div class="col-md-4">
                <p class="small text-muted-soft mb-1">Exhibitions in archive</p>
                <p class="h4 mb-0">{{ exhibitionsCount }}</p>
              </div>
              <div class="col-md-4">
                <p class="small text-muted-soft mb-1">Average artworks per show</p>
                <p class="h4 mb-0">18</p>
              </div>
              <div class="col-md-4">
                <p class="small text-muted-soft mb-1">Demo cities represented</p>
                <p class="h4 mb-0">5</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- UPCOMING + CURRENT MINI CARDS -->
      <section class="section-padding pt-4 pb-5">
        <div class="container">
          <div class="d-flex justify-content-between align-items-end mb-3">
            <div>
              <p class="section-heading mb-1">Programme overview</p>
              <h2 class="h3 mb-0">Upcoming & parallel exhibitions</h2>
            </div>
            <span class="small text-muted-soft d-none d-md-inline">
              This section is static content – ideal for school projects.
            </span>
          </div>

          <div class="row g-4">
            <div class="col-md-6 col-lg-4" *ngFor="let ex of currentParallel">
              <article class="soft-card h-100 hover-elevate p-4 d-flex flex-column">
                <div class="d-flex justify-content-between mb-2">
                  <span class="badge-soft">
                    <i class="bi bi-dot"></i>
                    Current
                  </span>
                  <span class="small text-muted-soft">{{ ex.dateRange }}</span>
                </div>
                <h3 class="h5 mb-1">{{ ex.title }}</h3>
                <p class="small text-muted-soft mb-3">{{ ex.subtitle }}</p>
                <p class="small text-muted-soft mb-3">
                  {{ ex.highlight }}
                </p>
                <div class="mt-auto d-flex justify-content-between align-items-center small">
                  <span class="text-muted-soft">
                    <i class="bi bi-geo-alt me-1"></i>{{ ex.location }}
                  </span>
                  <a routerLink="/artworks" class="text-decoration-none">
                    View pieces <i class="bi bi-arrow-right-short"></i>
                  </a>
                </div>
              </article>
            </div>

            <div class="col-md-6 col-lg-4" *ngFor="let ex of upcomingExhibitions">
              <article class="soft-card h-100 hover-elevate p-4 d-flex flex-column">
                <div class="d-flex justify-content-between mb-2">
                  <span class="badge-soft">
                    <i class="bi bi-calendar-event"></i>
                    Upcoming
                  </span>
                  <span class="small text-muted-soft">{{ ex.dateRange }}</span>
                </div>
                <h3 class="h5 mb-1">{{ ex.title }}</h3>
                <p class="small text-muted-soft mb-3">{{ ex.subtitle }}</p>
                <p class="small text-muted-soft mb-3">
                  {{ ex.highlight }}
                </p>
                <div class="mt-auto d-flex justify-content-between align-items-center small">
                  <span class="text-muted-soft">
                    <i class="bi bi-geo-alt me-1"></i>{{ ex.location }}
                  </span>
                  <span class="badge-soft">Free entry preview evening</span>
                </div>
              </article>
            </div>

            <div class="col-lg-4">
              <article class="glass-card h-100 p-4 d-flex flex-column">
                <p class="section-heading mb-2">Digital extensions</p>
                <h3 class="h5 mb-2">Online-only experiences</h3>
                <p class="small text-muted-soft mb-3">
                  Not every exhibition needs to be physical. The Aurora lab also runs online
                  experiments: generative artworks, live-coded visuals and webcam-based pieces.
                </p>
                <ul class="small text-muted-soft mb-3">
                  <li class="mb-1">Live generative visuals streamed during opening night</li>
                  <li class="mb-1">Guided screen-share tours for schools and remote visitors</li>
                  <li>Behind-the-scenes breakdowns of how each digital piece is built</li>
                </ul>
                <p class="small text-muted-soft mb-3">
                  For your project, you can mention this as a “hybrid” gallery model that lives both
                  in the browser and in a real space.
                </p>
                <a routerLink="/about" class="small text-decoration-none">
                  Learn more about the concept <i class="bi bi-arrow-right-short"></i>
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- PAST HIGHLIGHTS / TIMELINE -->
      <section class="section-padding pt-0">
        <div class="container">
          <div class="row gy-4">
            <div class="col-lg-5">
              <p class="section-heading mb-2">Past highlights</p>
              <h2 class="h3 mb-3">A short history of Aurora</h2>
              <p class="small text-muted-soft mb-3">
                The timeline below is invented for the project, but it shows how you can present
                institutional history in a compact, modern way without needing a CMS.
              </p>
              <p class="small text-muted-soft mb-3">
                Each entry mixes a simple year label with a description and a quick “impact”
                summary. This format is used by many contemporary museum websites.
              </p>
              <a routerLink="/contact" class="btn btn-ghost rounded-pill px-4">
                Suggest a future theme
              </a>
            </div>

            <div class="col-lg-7">
              <div class="soft-card p-4">
                <div
                  *ngFor="let highlight of pastHighlights; let last = last"
                  class="d-flex gap-3"
                >
                  <div class="timeline-year">
                    <span class="badge-soft">{{ highlight.year }}</span>
                  </div>
                  <div class="flex-grow-1 pb-4" [class.pb-0]="last">
                    <h3 class="h6 mb-1">{{ highlight.title }}</h3>
                    <p class="small text-muted-soft mb-1">
                      {{ highlight.description }}
                    </p>
                    <p class="small text-muted-soft mb-0">
                      <i class="bi bi-arrow-right-short"></i> {{ highlight.impact }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [
    `
      .exhibitions-page {
        min-height: 100vh;
      }

      .hero-exhibition-card {
        max-width: 680px;
        margin-left: auto;
      }

      .hero-thumb-wrapper {
        position: absolute;
        inset: 0.9rem;
        border-radius: 1.25rem;
        overflow: hidden;
        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.9);
      }

      .hero-thumb-label {
        position: absolute;
        left: 1.3rem;
        right: 1.3rem;
        bottom: 1.1rem;
        border-radius: 0.9rem;
        padding: 0.55rem 0.9rem;
        background: rgba(15, 23, 42, 0.94);
        border: 1px solid rgba(148, 163, 184, 0.4);
      }

      .timeline-year {
        width: 72px;
        display: flex;
        justify-content: flex-start;
        padding-top: 0.2rem;
      }

      .timeline-year::after {
        content: '';
        position: relative;
        left: 28px;
        top: 0.9rem;
        width: 2px;
        height: calc(100% - 0.9rem);
        background: linear-gradient(to bottom, rgba(148, 163, 184, 0.5), transparent);
      }

      @media (max-width: 767.98px) {
        .hero-exhibition-card {
          margin-left: 0;
        }
      }
    `,
  ],
})
export class ExhibitionsComponent implements OnInit {
  exhibitionsCount = 0;

  currentParallel: SimpleExhibition[] = [
    {
      id: 1,
      title: 'Echoes in Glass',
      subtitle: 'Small sculptures that trap reflections from the main show.',
      status: 'current',
      dateRange: 'Daily · 14 Feb – 30 Apr',
      highlight: 'Perfect as a quiet stop between the more intense projection rooms.',
      location: 'Atrium balcony',
      imageUrl:
        'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    },
  ];

  upcomingExhibitions: SimpleExhibition[] = [
    {
      id: 2,
      title: 'Cities Without Night',
      subtitle: 'A photography series imagining fully illuminated cities.',
      status: 'upcoming',
      dateRange: 'Opens May 2025',
      highlight:
        'Large-scale prints contrast silent streets with bright artificial auroras above skyscrapers.',
      location: 'Gallery 2',
      imageUrl:
        'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      title: 'Signals from Elsewhere',
      subtitle: 'Sound works based on intercepted radio and satellite noise.',
      status: 'upcoming',
      dateRange: 'Summer 2025',
      highlight:
        'Visitors sit in a darkened ring of speakers while projected captions trace invisible signals.',
      location: 'Project space',
      imageUrl:
        'https://images.unsplash.com/photo-1534448311378-1e193fb2570e?auto=format&fit=crop&w=900&q=80',
    },
  ];

  pastHighlights = [
    {
      year: '2022',
      title: 'Tracing the Horizon',
      description:
        'First large-scale group show mixing landscape painting with real-time weather data.',
      impact: 'Positioned Aurora as a space where traditional techniques meet live information feeds.',
    },
    {
      year: '2021',
      title: 'Rooms for One Listener',
      description:
        'A series of small sound installations where only a single visitor could enter at a time.',
      impact: 'Forced slow looking and deep listening – queues formed outside each room.',
    },
    {
      year: '2019',
      title: 'Machines That Remember',
      description:
        'Early experiment in using machine learning to reconstruct blurred family photographs.',
      impact:
        'Sparked the ongoing research collaboration that later led to the Luminescence season.',
    },
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAll<any>('exhibitions').subscribe({
      next: (data) => (this.exhibitionsCount = data.length),
      error: () => (this.exhibitionsCount = 0),
    });
  }
}
