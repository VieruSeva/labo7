import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Artwork } from '../../../core/models/artwork.model';
import { ArtworksService } from '../../../core/services/artworks.service';

@Component({
  selector: 'app-admin-artworks-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-artworks-list.component.html',
})
export class AdminArtworksListComponent implements OnInit {
  private artworksService = inject(ArtworksService);
  private router = inject(Router);

  artworks: Artwork[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadArtworks();
  }

  loadArtworks(): void {
    this.loading = true;
    this.error = null;

    this.artworksService.getAll().subscribe({
      next: (data) => {
        this.loading = false;
        this.artworks = data;
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load artworks.';
      },
    });
  }

  create(): void {
    this.router.navigate(['/admin/artworks/new']);
  }

  edit(artwork: Artwork): void {
    const id = (artwork as any).id;
    if (!id) {
      return;
    }
    this.router.navigate(['/admin/artworks', id]);
  }

  delete(artwork: Artwork): void {
    const id = (artwork as any).id;
    if (!id) {
      return;
    }

    if (!confirm(`Delete "${artwork.title}"?`)) {
      return;
    }

    this.loading = true;
    this.artworksService.remove(id).subscribe({
      next: () => {
        this.loading = false;
        this.artworks = this.artworks.filter(
          (a) => (a as any).id !== id,
        );
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to delete artwork.';
      },
    });
  }
}
