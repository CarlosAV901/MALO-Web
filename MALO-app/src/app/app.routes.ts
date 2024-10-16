import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';  // Importa el Dashboard
import { LogInComponent } from './auth/features/log-in/log-in.component';
import { SignUpComponent } from './auth/features/sign-up/sign-up.component';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent },  // La página de inicio es Dashboard
  {
    path: 'empleos',
    loadChildren: () => import('./empleos/empleos.routes').then(m => m.EmpleosRoutes)  // Rutas para empleos
  },
  {
    path:'login', component:LogInComponent
  },
  {
    path:'signup', component: SignUpComponent
  },
  { path: '**', redirectTo: '' }  // Redirige al Dashboard si no encuentra la ruta
];