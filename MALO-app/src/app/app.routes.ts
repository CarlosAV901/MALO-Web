import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';  // Importa el Dashboard

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent },  // La página de inicio es Dashboard
  {
    path: 'empleos',
    loadChildren: () => import('./empleos/empleos.routes').then(m => m.EmpleosRoutes)  // Rutas para empleos
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes').then(m => m.AUTH_ROUTES)  // Lazy load para auth
  },
  { path: '**', redirectTo: '' }  // Redirige al Dashboard si no encuentra la ruta
];
