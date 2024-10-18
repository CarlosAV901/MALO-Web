import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  currentStep = 1;

  nombre = '';
  apellidos = '';
  telefono = '';
  pais = '';
  estado = '';
  municipio = '';
  fechaNacimiento = '';
  correo = '';
  contrasena = '';

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  isForm1Valid(): boolean {
    return !!this.nombre && !!this.apellidos && !!this.telefono;
  }
  
  isForm2Valid(): boolean {
    return !!this.pais && !!this.estado && !!this.municipio;
  }
  
  isForm3Valid(): boolean {
    return !!this.fechaNacimiento && !!this.correo && !!this.contrasena;
  }
  
}
