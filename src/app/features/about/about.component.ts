import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-page section-padding">
      <div class="container">
        <!-- INTRO -->
        <div class="row gy-4 mb-5">
          <div class="col-lg-7">
            <p class="section-heading mb-2">About the project</p>
            <h1 class="display-5 fw-bold display-heading mb-3">
              Aurora Art Expo is a hybrid gallery built for both visitors and developers.
            </h1>
            <p class="lead text-muted-soft mb-3">
              In your real assignment this site functions as a demo museum. For visitors, it
              presents exhibitions and artworks. For teachers, it proves you can design a complete
              Angular application with routing, lists, search, filters and an admin area.
            </p>
            <p class="small text-muted-soft mb-0">
              Everything you see – artworks, exhibitions, statistics – is powered by an
              in-memory API. This means the project works 100% offline, with no external backend,
              while still behaving like a real data-driven site.
            </p>
          </div>
          <div class="col-lg-5">
            <div class="glass-card p-4 h-100">
              <p class="section-heading mb-2">Quick facts</p>
              <ul class="list-unstyled small text-muted-soft mb-3">
                <li class="mb-2">
                  <i class="bi bi-check2-circle text-warning me-2"></i>
                  Built with Angular standalone components, Bootstrap and an in-memory API.
                </li>
                <li class="mb-2">
                  <i class="bi bi-check2-circle text-warning me-2"></i>
                  Includes public pages, admin dashboard, charts and export features.
                </li>
                <li class="mb-2">
                  <i class="bi bi-check2-circle text-warning me-2"></i>
                  Fully responsive layout inspired by real museum websites.
                </li>
                <li>
                  <i class="bi bi-check2-circle text-warning me-2"></i>
                  Designed to be easy to extend with real backend later.
                </li>
              </ul>
              <a routerLink="/artworks" class="btn btn-primary rounded-pill px-4 w-100">
                Jump to the collection
              </a>
            </div>
          </div>
        </div>

        <!-- VALUES -->
        <div class="row gy-4 mb-5">
          <div class="col-lg-4">
            <p class="section-heading mb-2">What Aurora stands for</p>
            <h2 class="h3 mb-3">Three pillars of this gallery</h2>
            <p class="small text-muted-soft mb-3">
              To make your report easier to write, the project is organised around three clear
              ideas. You can reference them directly in the documentation or presentation.
            </p>
          </div>
          <div class="col-lg-8">
            <div class="row g-4">
              <div class="col-md-4" *ngFor="let value of values">
                <div class="soft-card p-4 h-100">
                  <div class="mb-3">
                    <i class="bi fs-3" [ngClass]="value.icon"></i>
                  </div>
                  <h3 class="h6 mb-2">{{ value.title }}</h3>
                  <p class="small text-muted-soft mb-0">{{ value.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TIMELINE / HOW THE PROJECT IS BUILT -->
        <div class="row gy-4 mb-5">
          <div class="col-lg-5">
            <p class="section-heading mb-2">How the app is structured</p>
            <h2 class="h3 mb-3">From wireframe to working site</h2>
            <p class="small text-muted-soft mb-3">
              Below is a short “production diary” of the project. It is a nice element to show in
              your lab report: it demonstrates that you understand how a complete app is built
              step by step.
            </p>
          </div>
          <div class="col-lg-7">
            <div class="soft-card p-4">
              <div *ngFor="let step of buildTimeline; let last = last" class="d-flex gap-3">
                <div class="timeline-step-index">
                  <span class="badge-soft">{{ step.step }}</span>
                </div>
                <div class="flex-grow-1 pb-4" [class.pb-0]="last">
                  <h3 class="h6 mb-1">{{ step.title }}</h3>
                  <p class="small text-muted-soft mb-1">{{ step.description }}</p>
                  <p class="small text-muted-soft mb-0">
                    <i class="bi bi-arrow-right-short"></i> {{ step.result }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TEAM / ROLES -->
        <div class="row gy-4 mb-5">
          <div class="col-lg-4">
            <p class="section-heading mb-2">People behind the project</p>
            <h2 class="h3 mb-3">Roles in a typical gallery team</h2>
            <p class="small text-muted-soft mb-3">
              In reality one person (you) implements everything, but in a professional context the
              work would be shared between several roles. This list helps connect the website to
              potential jobs.
            </p>
          </div>
          <div class="col-lg-8">
            <div class="row g-4">
              <div class="col-md-6" *ngFor="let role of teamRoles">
                <div class="soft-card p-4 h-100 d-flex flex-column">
                  <div class="d-flex align-items-center mb-2 gap-2">
                    <div class="avatar-circle-small"></div>
                    <h3 class="h6 mb-0">{{ role.title }}</h3>
                  </div>
                  <p class="small text-muted-soft mb-2">{{ role.description }}</p>
                  <p class="small text-muted-soft mb-0">
                    <span class="fw-semibold">In this project:</span> {{ role.inProject }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CALL TO ACTION -->
        <div class="glass-card p-4 p-md-5 mb-3">
          <div class="row align-items-center gy-3">
            <div class="col-md-8">
              <h2 class="h4 mb-2">Use Aurora as a base for future projects</h2>
              <p class="small text-muted-soft mb-0">
                You can keep this repository and later connect it to a real database or REST API.
                The structure with services, components and admin pages already prepares the
                groundwork, so you only have to replace the in-memory backend.
              </p>
            </div>
            <div class="col-md-4 text-md-end">
              <a routerLink="/admin" class="btn btn-primary rounded-pill px-4">
                Open admin dashboard
              </a>
            </div>
          </div>
        </div>

      </div>
    `,
  styles: [
    `
      .about-page {
        min-height: 100vh;
      }

      .timeline-step-index {
        width: 70px;
        display: flex;
        justify-content: flex-start;
        padding-top: 0.2rem;
      }

      .timeline-step-index::after {
        content: '';
        position: relative;
        left: 28px;
        top: 0.9rem;
        width: 2px;
        height: calc(100% - 0.9rem);
        background: linear-gradient(to bottom, rgba(148, 163, 184, 0.5), transparent);
      }

      .avatar-circle-small {
        width: 28px;
        height: 28px;
        border-radius: 999px;
        background: radial-gradient(circle at 0 0, #facc15, #3b82f6);
        border: 2px solid #020617;
      }

      @media (max-width: 767.98px) {
        .about-page {
          padding-top: 3rem;
        }
      }
    `,
  ],
})
export class AboutComponent {
  values = [
    {
      icon: 'bi-lightbulb',
      title: 'Clarity',
      description:
        'The interface should be simple enough for any visitor – and for any teacher reviewing the project.',
    },
    {
      icon: 'bi-cpu',
      title: 'Technology',
      description:
        'Modern Angular patterns (standalone components, services, in-memory API) are used throughout.',
    },
    {
      icon: 'bi-people',
      title: 'Accessibility',
      description:
        'Layouts are responsive, text is readable and navigation works well on both desktop and mobile.',
    },
  ];

  buildTimeline = [
    {
      step: '01',
      title: 'Design & wireframe',
      description:
        'Defined pages (Home, Exhibitions, Artworks, About, Contact, Admin) and basic user flows.',
      result:
        'Clear navigation map and list of components required for the first version of the site.',
    },
    {
      step: '02',
      title: 'Angular project setup',
      description:
        'Created a standalone Angular app with routing, theming, in-memory API and shared layout.',
      result:
        'A running skeleton with Navbar, Footer, router-outlet and a first home page placeholder.',
    },
    {
      step: '03',
      title: 'Data & services',
      description:
        'Added models and an ApiService that communicates with angular-in-memory-web-api.',
      result:
        'All content (artworks, exhibitions, artists) can be loaded from a single service in any component.',
    },
    {
      step: '04',
      title: 'Gallery features & admin',
      description:
        'Implemented list pages, search, filters, dashboard cards, charts and export buttons.',
      result:
        'The project feels like a real small CMS even though it runs entirely in the browser.',
    },
  ];

  teamRoles = [
    {
      title: 'Curator',
      description: 'Defines the exhibition themes, selects works and writes the wall texts.',
      inProject:
        'You decided which demo artworks and exhibitions exist and how they are described.',
    },
    {
      title: 'Frontend developer',
      description: 'Implements layouts, components and data flows in the browser.',
      inProject:
        'You built the Angular app, the routing system and all the interactive pages.',
    },
    {
      title: 'Designer',
      description: 'Shapes the visual identity, colour palette and overall mood of the site.',
      inProject:
        'You combined dark glassmorphism with warm aurora accents and clean typography.',
    },
    {
      title: 'Technical producer',
      description: 'Connects software, hardware and infrastructure so everything runs smoothly.',
      inProject:
        'You prepared the structure so a real backend or real gallery could later plug into this interface.',
    },
  ];
}
