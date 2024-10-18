import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginObj: any = {
    "email": "",
    "contrasena": ""
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.http.post("http://localhost:5271/api/Auth/login", this.loginObj).subscribe(
      (res: any) => {
        // Si la respuesta es exitosa y contiene un token
        if (res.token) {
          alert("Login success");
          localStorage.setItem('authToken', res.token);
          this.router.navigate(['/empleos/tablero']);
        } else {
          alert("Credenciales inválidas. Por favor, verifique su correo y contraseña.");
        }
      },
      (error: HttpErrorResponse) => {
        // Manejo de errores
        if (error.status === 500) {
          // Error interno del servidor
          alert("Error en el servidor. Por favor, inténtelo de nuevo más tarde.");
        } else if (error.status === 401) {
          // No autorizado
          alert("Credenciales inválidas. Por favor, verifique su correo y contraseña.");
        } else {
          // Otros errores
          alert("Hubo un error al intentar iniciar sesión. Por favor, inténtelo de nuevo.");
        }
      }
    );
  }
}