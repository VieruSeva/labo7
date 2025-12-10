import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Artwork } from '../models/artwork.model';

interface DbArtwork {
  id: string;
  title: string;
  year: number | null;
  medium: string | null;
  price_usd: number | null;
  for_sale: boolean | null;
  image_url: string | null;
  artist_id: string | null;
}

@Injectable({ providedIn: 'root' })
export class ArtworksService {
  private api = inject(ApiService);

  /**
   * Load all artworks from Supabase and map them into the UI model.
   */
  getAll(): Observable<Artwork[]> {
    return this.api
      .getAll<DbArtwork>('artworks')
      .pipe(
        map((rows: DbArtwork[]) =>
          rows.map((row: DbArtwork) => this.mapRowToArtwork(row)),
        ),
      );
  }

  /**
   * Load a single artwork by id (or null if not found).
   */
  getById(id: string): Observable<Artwork | null> {
    return this.api
      .getById<DbArtwork>('artworks', id)
      .pipe(
        map((row: DbArtwork | null) =>
          row ? this.mapRowToArtwork(row) : null,
        ),
      );
  }

  /**
   * Create a new artwork (used by the admin form).
   */
  add(artwork: Partial<Artwork>): Observable<Artwork> {
    return this.api
      .insert<DbArtwork>('artworks', this.toDbPayload(artwork))
      .pipe(map((row: DbArtwork) => this.mapRowToArtwork(row)));
  }

  /**
   * Update an existing artwork (used by the admin form).
   */
  update(id: string, artwork: Partial<Artwork>): Observable<Artwork> {
    return this.api
      .update<DbArtwork>('artworks', id, this.toDbPayload(artwork))
      .pipe(map((row: DbArtwork) => this.mapRowToArtwork(row)));
  }

  /**
   * Delete an artwork (used by the admin list).
   */
  remove(id: string): Observable<void> {
    return this.api.delete('artworks', id);
  }

  // --- mapping helpers ---

  private mapRowToArtwork(row: DbArtwork): Artwork {
    return {
      id: row.id,
      title: row.title,
      year: row.year,
      medium: row.medium,
      // These fields are not in the DB table; keep them nullable in the UI model
      dimensions: null,
      price: row.price_usd,
      imageUrl: row.image_url,
      description: null,
      artistId: row.artist_id,
      exhibitionId: null,
      isFeatured: !!row.for_sale,
    };
  }

  private toDbPayload(artwork: Partial<Artwork>): Partial<DbArtwork> {
    return {
      title: artwork.title ?? '',
      year: artwork.year ?? null,
      medium: artwork.medium ?? null,
      price_usd: artwork.price ?? null,
      for_sale: artwork.isFeatured ?? !!artwork.price,
      image_url: artwork.imageUrl ?? null,
      artist_id: artwork.artistId ?? null,
    };
  }
}
