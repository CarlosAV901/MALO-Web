import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

const appConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()  // Proporcionar HttpClient aquí
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
