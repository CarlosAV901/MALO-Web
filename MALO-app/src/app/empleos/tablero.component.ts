import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { UserService } from '../core/services/user.service'; // Ajusta la ruta según tu estructura
import { NavbarComponent } from '../shared/ui/layout/navbar.component';



@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  userName: string | null = null;
  name: string | null = null;

  constructor(private userService: UserService) {}

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

  // Método para cerrar sesión
  logout(): void {
    this.userService.clearToken(); // Borra el token
    this.userName = null; // Resetea el nombre de usuario
    this.name = null; // Resetea el nombre
  }
}