import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Artwork } from '../../core/models/artwork.model';
import { ArtworksService } from '../../core/services/artworks.service';

@Component({
  selector: 'app-gallery-collection',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gallery-collection.component.html'
})
export class GalleryCollectionComponent implements OnInit {
  private artworksService = inject(ArtworksService);

  allArtworks: Artwork[] = [];
  filteredArtworks: Artwork[] = [];

  loading = false;
  error: string | null = null;

  searchTerm = '';
  saleFilter: 'all' | 'for-sale' | 'display-only' = 'all';
  sortBy: 'title' | 'year-asc' | 'year-desc' = 'title';

  ngOnInit(): void {
    this.loadArtworks();
  }

  get totalCount(): number {
    return this.allArtworks.length;
  }

  get shownCount(): number {
    return this.filteredArtworks.length;
  }

  private loadArtworks(): void {
    this.loading = true;
    this.error = null;

    this.artworksService.getAll().subscribe({
      next: artworks => {
        this.loading = false;
        this.allArtworks = artworks;
        this.applyFilters();
      },
      error: err => {
        console.error('Failed to load artworks', err);
        this.loading = false;
        this.error = 'Failed to load artworks from database.';
        this.allArtworks = [];
        this.filteredArtworks = [];
      }
    });
  }

  onSearchTermChange(value: string): void {
    this.searchTerm = value;
    this.applyFilters();
  }

  onSaleFilterChange(value: 'all' | 'for-sale' | 'display-only'): void {
    this.saleFilter = value;
    this.applyFilters();
  }

  onSortChange(value: 'title' | 'year-asc' | 'year-desc'): void {
    this.sortBy = value;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.saleFilter = 'all';
    this.sortBy = 'title';
    this.applyFilters();
  }

  private applyFilters(): void {
    let result = [...this.allArtworks];

    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter(a => {
        const title = a.title?.toLowerCase() ?? '';
        const medium = a.medium?.toLowerCase() ?? '';
        return title.includes(term) || medium.includes(term);
      });
    }

    if (this.saleFilter === 'for-sale') {
      result = result.filter(a => !!a.price);
    } else if (this.saleFilter === 'display-only') {
      result = result.filter(a => !a.price);
    }

    result.sort((a, b) => {
      if (this.sortBy === 'year-asc') {
        return (a.year ?? 0) - (b.year ?? 0);
      }
      if (this.sortBy === 'year-desc') {
        return (b.year ?? 0) - (a.year ?? 0);
      }
      return a.title.localeCompare(b.title);
    });

    this.filteredArtworks = result;
  }
}
