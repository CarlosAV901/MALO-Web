import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RegisterCompany } from './register-company/register-company.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'register-company', component: RegisterCompany }
];
