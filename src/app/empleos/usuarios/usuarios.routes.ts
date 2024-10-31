import { Routes } from '@angular/router'; 
import { ListaEmpleosComponent } from './features/lista-empleos/lista-empleos.component'; 
import { PerfilComponent } from './features/perfil/perfil.component'; 
import { UserGuard } from '../../core/guards/user.guard';

export const usuariosRoutes: Routes = [
  { path: '', component: ListaEmpleosComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [UserGuard] },
];

