import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent }
];
