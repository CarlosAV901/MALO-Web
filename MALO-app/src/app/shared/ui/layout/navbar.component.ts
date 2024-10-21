import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service'; // Mantengo UserService
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Subscription } from 'rxjs';

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
  user = { email: '' };//name: '' 
  private authSubscription: Subscription;

  constructor(private userService: UserService) {
    // Suscripción a cambios de autenticación
    this.authSubscription = this.userService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        const userData = this.userService.getUserData();
        if (userData) {
          this.user.email = userData.email;
          //this.user.name = userData.name;
        }
      } else {
        this.user = { email: '' };//, name: ''
      }
    });
  }

  ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    
    if (this.menuOpen) {
      document.body.classList.add('no-scroll'); // Deshabilitar scroll
      document.addEventListener('touchmove', this.preventScroll, { passive: false });
      document.addEventListener('scroll', this.preventScroll, { passive: false });
    } else {
      document.body.classList.remove('no-scroll'); // Habilitar scroll de nuevo
      document.removeEventListener('touchmove', this.preventScroll);
      document.removeEventListener('scroll', this.preventScroll);
    }
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
    this.user = { email: '' };//, name: ''
    this.profileMenuOpen = false;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }
}
