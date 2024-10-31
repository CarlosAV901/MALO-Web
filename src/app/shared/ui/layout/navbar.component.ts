import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuOpen = false;
  profileMenuOpen = false;
  isAuthenticated = false;
  user = { email: '', rol: '' };
  private authSubscription: Subscription;
  private routerSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) {
    // Suscripción a cambios de autenticación
    this.authSubscription = this.userService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        const userData = this.userService.getUserData();
        if (userData) {
          this.user.email = userData.email;
          this.user.rol = userData.rol;
        }
      } else {
        this.user = { email: '', rol: '' };
      }
    });

    // Suscripción a eventos de navegación para cerrar el menú automáticamente
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => this.closeMenu(), 0);
    });
  }

  // Verifica si está en la página de perfil de usuario
  isOnProfilePage(): boolean {
    return this.router.url === '/usuario/perfil';
  }

  // Redirecciona a la página de perfil correcta según el rol
  navigateToProfile() {
    if (this.user.rol === 'Empresa') {
      this.router.navigate(['/empresa/perfil']);
    } else {
      this.router.navigate(['/usuario/perfil']);
    }
  }

  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.disableScroll();
    } else {
      this.enableScroll();
    }
  }

  closeMenu() {
    if (this.menuOpen) {
      this.menuOpen = false;
      this.enableScroll();
    }
  }

  disableScroll() {
    document.body.classList.add('no-scroll');
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
    document.addEventListener('wheel', this.preventScroll, { passive: false });
  }

  enableScroll() {
    document.body.classList.remove('no-scroll');
    document.removeEventListener('touchmove', this.preventScroll);
    document.removeEventListener('wheel', this.preventScroll);
  }

  preventScroll(event: Event) {
    event.preventDefault();
  }

  toggleProfileMenu(event: MouseEvent) {
    event.stopPropagation();
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  closeProfileMenu() {
    this.profileMenuOpen = false;
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const profileMenu = document.querySelector('.profile-menu');
    if (this.profileMenuOpen && profileMenu && !profileMenu.contains(target) && !target.closest('#perfil')) {
      this.closeProfileMenu();
    }
  }

  logout(): void {
    this.userService.clearToken();
    this.isAuthenticated = false;
    this.user = { email: '', rol: '' };
    this.profileMenuOpen = false;
    this.enableScroll();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }
}