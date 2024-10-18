import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service'; // Importa el servicio

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginObj: any = {
    email: '',
    contrasena: ''
  };

  http = inject(HttpClient);
  router = inject(Router);
  userService = inject(UserService);

  onLogin() {
    this.http.post("http://localhost:5271/api/Auth/login", this.loginObj).subscribe(
      (res: any) => {
        // Si la respuesta es exitosa y contiene un token
        if (res.token) {
          alert("Login success");
          localStorage.setItem('authToken', res.token); // Guardar el token
          this.router.navigate(['/empleos/tablero']);
        } else {
          alert("Credenciales inválidas. Por favor, verifique su correo y contraseña.");
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          alert("Error en el servidor. Por favor, inténtelo de nuevo más tarde.");
        } else if (error.status === 401) {
          alert("Credenciales inválidas.");
        } else {
          alert("Hubo un error al intentar iniciar sesión.");
        }
      }
    );
  }
}
