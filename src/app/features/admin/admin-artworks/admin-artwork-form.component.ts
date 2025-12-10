import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterModule,
} from '@angular/router';
import { Artwork } from '../../../core/models/artwork.model';
import { ArtworksService } from '../../../core/services/artworks.service';

@Component({
  selector: 'app-admin-artwork-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-artwork-form.component.html',
})
export class AdminArtworkFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private artworksService = inject(ArtworksService);

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    year: [null],
    medium: [''],
    price: [null],
    status: ['for-sale'],
    imageUrl: [''],
    description: [''],
    artistName: [''],
    artistId: [''],
  });

  isEditMode = false;
  loading = false;
  error: string | null = null;
  private artworkId: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id && id !== 'new') {
        this.isEditMode = true;
        this.artworkId = id;
        this.loadArtwork(id);
      }
    });
  }

  private loadArtwork(id: string): void {
    this.loading = true;
    this.error = null;

    this.artworksService.getById(id).subscribe({
      next: (artwork) => {
        this.loading = false;
        if (!artwork) {
          this.error = 'Artwork not found.';
          return;
        }

        const a: any = artwork;

        this.form.patchValue({
          title: artwork.title ?? '',
          year: artwork.year ?? null,
          medium: artwork.medium ?? '',
          price: a.price ?? null,
          status: a.status ?? 'for-sale',
          imageUrl: artwork.imageUrl ?? '',
          description: artwork.description ?? '',
          artistName: a.artistName ?? '',
          artistId: a.artistId ?? '',
        });
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load artwork details.';
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;

    const payload: Partial<Artwork> = {
      title: raw.title,
      year: raw.year ?? undefined,
      medium: raw.medium || undefined,
      imageUrl: raw.imageUrl || undefined,
      description: raw.description || undefined,
      artistName: raw.artistName || undefined,
      ...(raw.price != null ? { price: raw.price } : {}),
      ...(raw.status ? { status: raw.status } : {}),
      ...(raw.artistId ? { artistId: raw.artistId } : {}),
    } as any;

    this.loading = true;
    this.error = null;

    const request$ =
      this.isEditMode && this.artworkId
        ? this.artworksService.update(this.artworkId, payload)
        : this.artworksService.add(payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/artworks']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to save artwork. Please try again.';
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/artworks']);
  }
}
