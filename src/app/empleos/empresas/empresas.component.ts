import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { UserService } from '../../core/services/user.service';
import { NavbarComponent } from '../../shared/ui/layout/navbar.component';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent], // Agrega RouterModule aquí
  templateUrl: './empresas.component.html'
})
export class empresasComponent implements OnInit {
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