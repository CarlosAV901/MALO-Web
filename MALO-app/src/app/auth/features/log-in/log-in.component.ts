import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm  } from '@angular/forms';
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

  // Método de inicio de sesión
  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      // Llamar a la API de inicio de sesión
      this.http.post("http://localhost:5271/api/Auth/login", this.loginObj).subscribe(
        (res: any) => {
          if (res.token) {
            localStorage.setItem('authToken', res.token);
            this.userService.setAuthenticationState(true);
            this.router.navigate(['/empleos/tablero']);
          } else {
            alert("Credenciales inválidas. Por favor, verifique su correo y contraseña.");
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 500 || error.status === 401) {
            alert("ERROR");
          } else {
            alert("Error en el servidor. Por favor, inténtelo más tarde.");
          }
        }
      );
    } else {
      alert("Por favor, completa el formulario correctamente.");
    }
  }
}
/*
  onLogin(){
    debugger;
    this.http.post("https://malo-backend.onrender.com/api/auth/login", this.loginObj).subscribe((res:any)=>{
      debugger;
      if(res.result){
        alert("Login success")
      }else{
        alert("error en contrase;a o usuario")
      }
    })
  }
*/