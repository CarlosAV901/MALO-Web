import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/ui/layout/navbar.component';
import { FooterComponent } from './shared/ui/footer/footer.component';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule] // Añade CommonModule aquí
})
export class AppComponent {
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Cambia el valor de showNavbar dependiendo de la ruta actual
        this.showNavbar = !(event.url.includes('/login') || event.url.includes('/signup'));
      });
  }
}
