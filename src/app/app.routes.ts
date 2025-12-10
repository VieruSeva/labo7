import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ArtworkListComponent } from './features/artworks/artwork-list/artwork-list.component';
import { ContactComponent } from './features/contact/contact.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { AdminArtworksListComponent } from './features/admin/admin-artworks/admin-artworks-list.component';
import { AdminArtworkFormComponent } from './features/admin/admin-artworks/admin-artwork-form.component';
import { ExhibitionsComponent } from './features/exhibitions/exhibitions.component';
import { AboutComponent } from './features/about/about.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public site
  { path: '', component: HomeComponent },
  { path: 'artworks', component: ArtworkListComponent },
  // still using the list for details in this demo
  { path: 'artworks/:id', component: ArtworkListComponent },

  // NEW real pages
  { path: 'exhibitions', component: ExhibitionsComponent },
  { path: 'about', component: AboutComponent },

  // You can make a separate Artists page later; for now it can stay as-home or reuse artworks
  { path: 'artists', component: HomeComponent },

  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },

  // Admin area
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'artworks', component: AdminArtworksListComponent },
      { path: 'artworks/new', component: AdminArtworkFormComponent },
      { path: 'artworks/:id/edit', component: AdminArtworkFormComponent },
    ],
  },

  // Fallback
  { path: '**', redirectTo: '' },
];
