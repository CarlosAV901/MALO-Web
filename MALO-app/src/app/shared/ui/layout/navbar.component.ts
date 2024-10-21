import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service'; // Ajusta la ruta según tu estructura
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule], // Agrega CommonModule aquí
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuOpen = false;
  profileMenuOpen = false;
  isAuthenticated = false; // Estado de autenticación
  private authSubscription: Subscription; // Suscripción a cambios de autenticación

  constructor(private userService: UserService) {
    this.authSubscription = this.userService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated; // Actualiza el estado
    });
  }

  ngOnInit(): void {
    // Listener global para detectar clic fuera del menú de perfil
    document.addEventListener('click', this.handleClickOutside.bind(this));
    // Listener para el scroll
    document.addEventListener('scroll', this.closeProfileMenu.bind(this));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleProfileMenu(event: MouseEvent) {
    // Prevenir que el click dentro del menú cierre el menú
    event.stopPropagation(); // Evita que el clic en "Perfil" cierre el menú inmediatamente
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  // Cierra el menú de perfil
  closeProfileMenu() {
    if (this.profileMenuOpen) {
      this.profileMenuOpen = false;
    }
  }

  // Detecta si el clic fue fuera del menú y lo cierra
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const profileMenu = document.querySelector('.profile-menu');

    // Aseguramos que si hacemos clic fuera del menú y no en el botón de perfil, se cierre el menú
    if (this.profileMenuOpen && profileMenu && !profileMenu.contains(target) && !target.closest('a')) {
      this.closeProfileMenu();
    }
  }

  logout(): void {
    this.userService.clearToken();
    this.profileMenuOpen = false; // Cerrar el menú después de cerrar sesión
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe(); // Desuscribirse para evitar fugas de memoria
    // Remueve los listeners al destruir el componente
    document.removeEventListener('click', this.handleClickOutside.bind(this));
    document.removeEventListener('scroll', this.closeProfileMenu.bind(this));
  }
  
}
