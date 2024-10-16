import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig = [
  provideRouter(appRoutes),
  // otros providers
];
