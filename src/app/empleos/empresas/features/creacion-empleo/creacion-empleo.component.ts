// creacion-empleo.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../../../shared/ui/notification/notification.component';

@Component({
  selector: 'app-creacion-empleo',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, CommonModule, NotificationComponent],
  templateUrl: './creacion-empleo.component.html',
  styleUrls: ['./creacion-empleo.component.css']
})
export class CreacionEmpleoComponent {
  empleoForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.empleoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      salarioMinimo: [0, [Validators.required, Validators.min(0)]],
      salarioMaximo: [0, [Validators.required, Validators.min(0)]],
      horario: ['', Validators.required],
      multimediaNombre: ['', Validators.required],
      multimediaTipo: ['', Validators.required],
      multimediaContenido: ['', Validators.required]
    });
  }

  crearEmpleo() {
    const userData = this.userService.getUserData();
    if (!userData) {
      console.error("Usuario no autenticado");
      this.errorMessage = "Usuario no autenticado";
      return;
    }

    if (!this.empleoForm.valid) {
      console.error("Formulario inválido. Revise los datos ingresados.");
      this.errorMessage = "Formulario inválido. Revise los datos ingresados.";
      this.clearMessagesAfterDelay();
      return;
    }

    const formValues = this.empleoForm.value;
    if (typeof formValues.titulo !== 'string' || typeof formValues.descripcion !== 'string' ||
        typeof formValues.ubicacion !== 'string' || typeof formValues.horario !== 'string' ||
        typeof formValues.multimediaNombre !== 'string' || typeof formValues.multimediaTipo !== 'string' ||
        typeof formValues.multimediaContenido !== 'string') {
      console.error("Error en los tipos de datos: Algunos campos que deberían ser strings no lo son.");
      this.errorMessage = "Error en los tipos de datos: Algunos campos que deberían ser strings no lo son.";
      return;
    }

    if (typeof formValues.salarioMinimo !== 'number' || typeof formValues.salarioMaximo !== 'number') {
      console.error("Error en los tipos de datos: Los campos salarioMinimo y salarioMaximo deben ser números.");
      this.errorMessage = "Error en los tipos de datos: Los campos salarioMinimo y salarioMaximo deben ser números.";
      return;
    }

    const empleoData = {
      ...formValues,
      empresa_id: userData.sub,
      salario_minimo: formValues.salarioMinimo,
      salario_maximo: formValues.salarioMaximo
    };
    this.isLoading = true;

    this.http.post('https://malo-backend-empleos.onrender.com/api/Empleo/PostEmpleo', empleoData, { responseType: 'text' })
      .subscribe(
        response => {
          console.log('Empleo creado exitosamente:', response);
          this.router.navigate(['/empresa']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.error("Error de validación en el servidor:", error.error);
            this.errorMessage = "Error de validación en el servidor: " + error.error;
          } else if (error.status === 500) {
            console.error("Error del servidor al procesar la solicitud:", error.error);
            this.errorMessage = "Error del servidor al procesar la solicitud: " + error.error;
          } else {
            console.error("Error desconocido al crear empleo:", error);
            this.errorMessage = "Error desconocido al crear empleo: " + error.error;
          }
        }
      ).add(() => {
        this.isLoading = false;
      });
  }

  private clearMessagesAfterDelay() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000);
  }
}