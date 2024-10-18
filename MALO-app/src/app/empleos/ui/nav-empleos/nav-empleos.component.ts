import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';// Ajusta la ruta según tu estructura
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-empleos',
  standalone: true,
  imports: [RouterModule, CommonModule], // Agrega CommonModule aquí
  templateUrl: './nav-empleos.component.html',
  styleUrls: ['./nav-empleos.component.css']
})
export class NavEmpleosComponent implements OnInit {
  menuOpen = false;
  isAuthenticated = false; // Estado de autenticación
  private authSubscription: Subscription; // Suscripción a cambios de autenticación

  constructor(private userService: UserService) {
    this.authSubscription = this.userService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated; // Actualiza el estado
    });
  }

  ngOnInit(): void {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe(); // Desuscribirse para evitar fugas de memoria
  }
}
