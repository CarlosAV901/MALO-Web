import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-empleo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-empleo.component.html',
  styleUrls: ['./detalle-empleo.component.css']
})
export class DetalleEmpleoComponent {
  @Input() empleo: any;
  isAuthenticated: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    // Suscribirse al estado de autenticación
    this.userService.isAuthenticated$.subscribe(authState => {
      this.isAuthenticated = authState;
    });
  }

  onButtonClick() {
    if (this.isAuthenticated) {
      // Lógica para postularse
      console.log('Postulación enviada');
    } else {
      // Redirigir al usuario al login
      this.router.navigate(['/auth/login']);
    }
  }
}
