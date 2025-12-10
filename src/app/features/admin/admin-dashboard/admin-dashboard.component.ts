import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ApiService } from '../../../core/services/api.service';
import { Artwork } from '../../../core/models/artwork.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  template: `
    <div class="container-fluid py-5">
      <!-- Title + subtitle -->
      <div class="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 class="mb-1 fw-semibold">Admin Dashboard</h2>
          <p class="text-muted mb-0">
            Quick overview of the Aurora Art Expo collection and activity.
          </p>
        </div>

        <div class="text-end">
          <span class="badge bg-dark-subtle text-dark px-3 py-2">
            Live data from Supabase
          </span>
        </div>
      </div>

      <!-- Stat tiles -->
      <div class="row g-4 mb-4">
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm bg-primary text-white">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <p class="text-uppercase small mb-1 opacity-75">Total artworks</p>
                  <h3 class="display-6 mb-0">{{ artworksCount }}</h3>
                </div>
                <i class="bi bi-easel fs-1 opacity-75"></i>
              </div>
              <p class="small mb-0 opacity-75">
                All artworks currently stored in the database.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm bg-success text-white">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <p class="text-uppercase small mb-1 opacity-75">Total artists</p>
                  <h3 class="display-6 mb-0">{{ artistsCount }}</h3>
                </div>
                <i class="bi bi-people fs-1 opacity-75"></i>
              </div>
              <p class="small mb-0 opacity-75">
                Unique artists linked to the artworks table.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm bg-info text-white">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <p class="text-uppercase small mb-1 opacity-75">Total exhibitions</p>
                  <h3 class="display-6 mb-0">{{ exhibitionsCount }}</h3>
                </div>
                <i class="bi bi-building fs-1 opacity-75"></i>
              </div>
              <p class="small mb-0 opacity-75">
                Exhibitions currently defined in the database.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts -->
      <div class="row g-4">
        <!-- Medium doughnut chart -->
        <div class="col-lg-6">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <span class="fw-semibold">Artworks by medium</span>
              <span class="badge bg-light text-muted small">distribution</span>
            </div>
            <div class="card-body">
              <div class="ratio ratio-4x3">
                <canvas
                  baseChart
                  [data]="mediumChartData"
                  [options]="chartOptions"
                  [type]="'doughnut'">
                </canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Price bar chart -->
        <div class="col-lg-6">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <span class="fw-semibold">Top 5 artworks by price</span>
              <span class="badge bg-light text-muted small">USD</span>
            </div>
            <div class="card-body">
              <div class="ratio ratio-4x3">
                <canvas
                  baseChart
                  [data]="priceChartData"
                  [options]="chartOptions"
                  [type]="'bar'">
                </canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="mt-4 d-flex flex-wrap gap-2">
        <a routerLink="/admin/artworks" class="btn btn-outline-dark btn-sm">
          <i class="bi bi-grid me-1"></i> Manage artworks
        </a>
        <a routerLink="/admin/artists" class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-person-lines-fill me-1"></i> Manage artists
        </a>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent implements OnInit {
  artworksCount = 0;
  artistsCount = 0;
  exhibitionsCount = 0;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 14,
          boxHeight: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.label ?? '';
            const value = ctx.parsed as number;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      // Used only by the bar chart; doughnut ignores this
      x: {
        ticks: {
          font: { size: 11 },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 11 },
        },
      },
    },
  };

  mediumChartData: ChartData<'doughnut', number[], string> = {
    labels: [],
    datasets: [{ data: [] }],
  };

  priceChartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{ data: [], label: 'Price ($)' }],
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Artists count
    this.api.getAll<any>('artists').subscribe({
      next: (rows) => (this.artistsCount = rows.length),
      error: () => (this.artistsCount = 0),
    });

    // Exhibitions count
    this.api.getAll<any>('exhibitions').subscribe({
      next: (rows) => (this.exhibitionsCount = rows.length),
      error: () => (this.exhibitionsCount = 0),
    });

    // Artworks + charts
    this.api.getAll<Artwork>('artworks').subscribe({
      next: (artworks) => {
        this.artworksCount = artworks.length;
        this.prepareCharts(artworks);
      },
      error: () => {
        this.artworksCount = 0;
        this.mediumChartData = { labels: [], datasets: [{ data: [] }] };
        this.priceChartData = { labels: [], datasets: [{ data: [], label: 'Price ($)' }] };
      },
    });
  }

  private prepareCharts(artworks: Artwork[]): void {
    // ---- Doughnut: mediums ----
    const mediumMap = new Map<string, number>();

    artworks.forEach((a) => {
      const key = a.medium ?? 'Unknown';
      mediumMap.set(key, (mediumMap.get(key) ?? 0) + 1);
    });

    const mediumLabels = Array.from(mediumMap.keys());
    const mediumValues = Array.from(mediumMap.values());

    this.mediumChartData = {
      labels: mediumLabels,
      datasets: [
        {
          data: mediumValues,
          backgroundColor: [
            '#4f46e5',
            '#22c55e',
            '#f97316',
            '#06b6d4',
            '#ec4899',
            '#a855f7',
            '#eab308',
          ],
          borderWidth: 0,
        },
      ],
    };

    // ---- Bar: top 5 by price ----
    const priced = artworks.filter((a) => a.price !== null && a.price !== undefined);
    const sortedByPrice = [...priced]
      .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
      .slice(0, 5);

    if (sortedByPrice.length === 0) {
      this.priceChartData = {
        labels: ['No priced artworks'],
        datasets: [
          {
            data: [0],
            label: 'Price ($)',
            backgroundColor: '#d4d4d8',
            borderRadius: 8,
            maxBarThickness: 40,
          },
        ],
      };
      return;
    }

    this.priceChartData = {
      labels: sortedByPrice.map((a) =>
        a.title.length > 14 ? a.title.slice(0, 14) + '…' : a.title,
      ),
      datasets: [
        {
          data: sortedByPrice.map((a) => a.price ?? 0),
          label: 'Price ($)',
          backgroundColor: '#4f46e5',
          borderRadius: 8,
          maxBarThickness: 40,
        },
      ],
    };
  }
}
