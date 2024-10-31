import { Routes } from '@angular/router'; 
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { UsuariosComponent } from './empleos/usuarios/usuarios.component';
import { empresasComponent } from './empleos/empresas/empresas.component'; 

import { UserGuard } from './core/guards/user.guard';
import { EmpresaGuard } from './core/guards/empresa.guard';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent },  
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes').then(m => m.AUTH_ROUTES)  // Lazy load para auth
  },
  {
    path: 'usuario',
    component: UsuariosComponent,
    loadChildren: () => import('./empleos/usuarios/usuarios.routes').then(m => m.usuariosRoutes)
  },
  {
    path: 'empresa',
    component: empresasComponent,
    loadChildren: () => import('./empleos/empresas/empresas.routes').then(m => m.empresasRoutes),
    canActivate: [EmpresaGuard]
  },
  { path: '**', redirectTo: '' }  
];
