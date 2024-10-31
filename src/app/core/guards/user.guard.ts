import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const userData = this.userService.getUserData();
    
    if (userData && userData.rol === 'Usuario') {
      return true;
    }

    this.router.navigate(['/login']); // Redirigir al login si no es Usuario
    return false;
  }
}
