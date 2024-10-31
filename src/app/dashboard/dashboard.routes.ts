import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'nosotros',
        component: NosotrosComponent
      }
    ]
  }
];
