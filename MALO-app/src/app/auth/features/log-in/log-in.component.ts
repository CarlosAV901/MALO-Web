import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule], // Agregar CommonModule aquí
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

  onLogin(loginForm: any) {
    if (loginForm.valid) {
      this.http.post("http://localhost:5271/api/Auth/login", this.loginObj).subscribe(
        (res: any) => {
          if (res.token) {
            alert("Login success");
            localStorage.setItem('authToken', res.token);
            this.userService.setAuthenticationState(true);
            this.router.navigate(['/empleos/tablero']);
          } else {
            alert("Credenciales inválidas. Por favor, verifique su correo y contraseña.");
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 500) {
            alert("Credenciales inválidas. Por favor, verifique su correo y contraseña.");
          } else if (error.status === 401) {
            alert("Credenciales inválidas.");
          } else {
            alert("Credenciales inválidas. Por favor, verifique su correo y contraseña.");
          }
        }
      );
    } else {
      alert("Por favor, completa el formulario correctamente.");
    }
  }
}
