import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/services/user.service';
import { NavbarComponent } from '../shared/ui/layout/navbar.component';
import { SearchBarComponent } from './ui/search-bar/search-bar.component';
import { ListaEmpleosComponent } from "./features/lista-empleos/lista-empleos.component"; // Importar el componente de card

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SearchBarComponent, ListaEmpleosComponent],
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
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
