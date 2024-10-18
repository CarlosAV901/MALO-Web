import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient()  // Provisión global de HttpClient
  ]
};
