// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // HttpClient with DI-based interceptors (works with your ApiService)
    provideHttpClient(withInterceptorsFromDi()),

    // Register Chart.js for ng2-charts
    provideCharts(withDefaultRegisterables()),
  ],
};
