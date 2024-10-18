import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { empleosRoutes } from './empleos/empleos.routes'; // Importa las rutas de empleos

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent },  
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes').then(m => m.AUTH_ROUTES)  // Lazy load para auth
  },
  {
    path: 'empleos', // Agrégale la ruta base para empleos
    children: empleosRoutes // Usa las rutas importadas aquí
  },
  { path: '**', redirectTo: '' }  
];
