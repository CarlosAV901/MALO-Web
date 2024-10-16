import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent, // Ruta principal del dashboard
    children: [
      {
        path: 'nosotros',
        component: NosotrosComponent  // Ruta para el componente "Nosotros"
      }
    ]
  }
];
