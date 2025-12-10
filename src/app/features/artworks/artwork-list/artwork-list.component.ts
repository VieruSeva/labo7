import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArtworksService } from '../../../core/services/artworks.service';
import { Artwork } from '../../../core/models/artwork.model';

type AvailabilityFilter = 'all' | 'forSale' | 'displayOnly';
type SortOption = 'newest' | 'oldest' | 'priceHigh' | 'priceLow' | 'year';

@Component({
  selector: 'app-artwork-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container py-5">
      <!-- Header -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <p class="text-uppercase small text-muted mb-1">Collection</p>
          <h1 class="display-6 fw-semibold mb-2">Aurora Artworks</h1>
          <p class="text-muted mb-0">
            Browse the curated selection of works currently available in the Aurora Art Expo database.
          </p>
        </div>

        <div class="d-flex flex-column align-items-md-end gap-2">
          <span class="badge rounded-pill bg-dark-subtle text-dark small px-3 py-2">
            {{ filteredArtworks.length }} works · page {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            class="btn btn-outline-secondary btn-sm"
            type="button"
            (click)="reload()"
          >
            <i class="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="row g-3 align-items-end">
            <!-- Search -->
            <div class="col-12 col-md-4">
              <label class="form-label small text-muted">Search</label>
              <div class="input-group">
                <span class="input-group-text border-end-0 bg-transparent">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  class="form-control border-start-0"
                  placeholder="Title, medium, description..."
                  [(ngModel)]="searchTerm"
                  (ngModelChange)="onSearchChange()"
                />
              </div>
            </div>

            <!-- Availability -->
            <div class="col-12 col-md-4">
              <label class="form-label small text-muted">Availability</label>
              <div class="btn-group w-100" role="group">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  [class.active]="availabilityFilter === 'all'"
                  (click)="changeAvailability('all')"
                >
                  All
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  [class.active]="availabilityFilter === 'forSale'"
                  (click)="changeAvailability('forSale')"
                >
                  For sale
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  [class.active]="availabilityFilter === 'displayOnly'"
                  (click)="changeAvailability('displayOnly')"
                >
                  Display only
                </button>
              </div>
            </div>

            <!-- Sort -->
            <div class="col-12 col-md-4">
              <label class="form-label small text-muted">Sort by</label>
              <select
                class="form-select form-select-sm"
                [(ngModel)]="sortOption"
                (ngModelChange)="onSortChange()"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="year">Year (desc)</option>
                <option value="priceHigh">Price: high → low</option>
                <option value="priceLow">Price: low → high</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading & error states -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-dark" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading artworks...</p>
      </div>

      <div *ngIf="!loading && error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error && !filteredArtworks.length" class="text-center py-5 text-muted">
        No artworks match your current filters.
      </div>

      <!-- Grid -->
      <div *ngIf="!loading && !error && filteredArtworks.length" class="row g-4">
        <div
          class="col-12 col-sm-6 col-lg-4"
          *ngFor="let art of pagedArtworks"
        >
          <div
            class="card h-100 border-0 shadow-sm hover-lift"
            role="button"
            [routerLink]="['/artworks', art.id]"
          >
            <div class="ratio ratio-4x3 overflow-hidden">
              <img
                [src]="art.imageUrl || fallbackImage"
                class="card-img-top object-fit-cover"
                [alt]="art.title"
              />
            </div>

            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 class="card-title mb-1">{{ art.title }}</h5>
                  <p class="small text-muted-soft mb-1">
                    {{ art.year || 'Year unknown' }} · {{ art.medium || 'Medium unknown' }}
                  </p>
                </div>

                <button
                  type="button"
                  class="btn btn-sm btn-light rounded-circle shadow-sm"
                  (click)="toggleLike(art.id); $event.stopPropagation()"
                >
                  <i
                    class="bi"
                    [ngClass]="isLiked(art.id) ? 'bi-heart-fill text-danger' : 'bi-heart'"
                  ></i>
                </button>
              </div>

              <p class="small text-muted-soft mb-3">
                {{ truncateDescription(art.description, 90) }}
              </p>

    <div class="mt-auto d-flex justify-content-between align-items-center">
  <span class="fw-semibold" *ngIf="art.price !== null; else priceLabel">
    {{ art.price | currency:'USD':'symbol':'1.0-0' }}
  </span>
  <ng-template #priceLabel>
    <span class="text-muted small">
      Not for sale
    </span>
  </ng-template>

  <span
    class="badge rounded-pill"
    [ngClass]="art.price !== null ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'"
  >
    {{ art.price !== null ? 'Available' : 'On display' }}
  </span>
</div>

            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav
        *ngIf="!loading && !error && totalPages > 1"
        class="d-flex justify-content-center mt-4"
        aria-label="Artwork pagination"
      >
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item" [class.disabled]="currentPage === 1">
            <button class="page-link" (click)="changePage(-1)">
              Previous
            </button>
          </li>

          <li class="page-item disabled">
            <span class="page-link">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
          </li>

          <li class="page-item" [class.disabled]="currentPage === totalPages">
            <button class="page-link" (click)="changePage(1)">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  `,
})
export class ArtworkListComponent implements OnInit {
  artworks: Artwork[] = [];
  filteredArtworks: Artwork[] = [];

  loading = false;
  error: string | null = null;

  searchTerm = '';
  availabilityFilter: AvailabilityFilter = 'all';
  sortOption: SortOption = 'newest';

  currentPage = 1;
  pageSize = 6;
  totalPages = 0;

  fallbackImage =
    'https://images.pexels.com/photos/594221/pexels-photo-594221.jpeg?auto=compress&cs=tinysrgb&w=960';

  private likedIds = new Set<string>();

  constructor(private artworksService: ArtworksService) {}

  ngOnInit(): void {
    this.reload();
  }

  get pagedArtworks(): Artwork[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredArtworks.slice(start, start + this.pageSize);
  }

  reload(): void {
    this.loading = true;
    this.error = null;

    this.artworksService.getAll().subscribe({
      next: (data) => {
        this.artworks = data;
        this.applyFiltersAndSorting();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load artworks from the server.';
        this.loading = false;
      },
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFiltersAndSorting();
  }

  changeAvailability(filter: AvailabilityFilter): void {
    if (this.availabilityFilter === filter) {
      return;
    }
    this.availabilityFilter = filter;
    this.currentPage = 1;
    this.applyFiltersAndSorting();
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.applyFiltersAndSorting();
  }

  changePage(delta: number): void {
    const next = this.currentPage + delta;
    if (next < 1 || next > this.totalPages) {
      return;
    }
    this.currentPage = next;
  }

  private applyFiltersAndSorting(): void {
    let result = [...this.artworks];

    const q = this.searchTerm.trim().toLowerCase();
    if (q) {
      result = result.filter((a) => {
        const title = a.title?.toLowerCase() ?? '';
        const medium = a.medium?.toLowerCase() ?? '';
        const desc = a.description?.toLowerCase() ?? '';
        return title.includes(q) || medium.includes(q) || desc.includes(q);
      });
    }

    if (this.availabilityFilter === 'forSale') {
      result = result.filter((a: any) => a.price !== null && a.price !== undefined);
    } else if (this.availabilityFilter === 'displayOnly') {
      result = result.filter((a: any) => a.price === null || a.price === undefined);
    }

    const getYearValue = (a: Artwork): number => a.year ?? 0;
    const getPriceValue = (a: Artwork): number => {
      const p = (a as any).price;
      return typeof p === 'number' ? p : 0;
    };

    switch (this.sortOption) {
      case 'oldest':
        result.sort((a, b) => getYearValue(a) - getYearValue(b));
        break;
      case 'year':
        result.sort((a, b) => getYearValue(b) - getYearValue(a));
        break;
      case 'priceHigh':
        result.sort((a, b) => getPriceValue(b) - getPriceValue(a));
        break;
      case 'priceLow':
        result.sort((a, b) => getPriceValue(a) - getPriceValue(b));
        break;
      case 'newest':
      default:
        result.sort((a, b) => getYearValue(b) - getYearValue(a));
        break;
    }

    this.filteredArtworks = result;
    this.totalPages = Math.max(1, Math.ceil(this.filteredArtworks.length / this.pageSize));
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  truncateDescription(description: string | null, maxLength: number): string {
    const text = description ?? '';
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '…';
  }

  toggleLike(id: string): void {
    if (this.likedIds.has(id)) {
      this.likedIds.delete(id);
    } else {
      this.likedIds.add(id);
    }
  }

  isLiked(id: string): boolean {
    return this.likedIds.has(id);
  }
}
