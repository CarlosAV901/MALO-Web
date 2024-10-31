import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { UserService } from '../../core/services/user.service';
import { NavbarComponent } from '../../shared/ui/layout/navbar.component';
import { SearchBarComponent } from './ui/search-bar/search-bar.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SearchBarComponent], // Agrega RouterModule aquí
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  userName: string | null = null;
  name: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userData = this.userService.getUserData();
    if (userData) {
      this.userName = userData.email;
      this.name = userData.nombre;
    } else {
      this.userName = null;
      this.name = null;
    }
  }

  logout(): void {
    this.userService.clearToken();
    this.userName = null;
    this.name = null;
  }
}
