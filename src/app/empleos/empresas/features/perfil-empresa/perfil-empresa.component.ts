import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { NotificationComponent } from '../../../../shared/ui/notification/notification.component';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PEmpresasService } from '../../../../core/services/pEmpresas.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, NotificationComponent],
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent implements OnInit {
  // Datos usuario
  nombre = '';
  prevName = '';
  industria = '';
  prevIndustria = '';
  correo = '';
  prevCorreo = '';
  ubicacion = '';
  prevUbicacion = '';

  emailTouched: boolean = false;
  nombreTouched: boolean = false;
  industriaTouched: boolean = false;
  ubicacionTouched: boolean = false;

  // Otros
  router = inject(Router);
  userService = inject(UserService);
  empresasService = inject(PEmpresasService);
  isLoading: boolean = false;
  emailSent: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  @ViewChild('profileContainer') profileContainer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit() {
    this.obtenerEmpresaPorId();

    setTimeout(() => {
      const separators = this.profileContainer.nativeElement.querySelectorAll('.separator-container');
      separators.forEach((separator: HTMLElement) => {
        separator.addEventListener('click', () => {
          const content = separator.nextElementSibling as HTMLElement;
          const icon = separator.querySelector('.separator-icon') as HTMLElement;
          content.classList.toggle('visible');
          icon.classList.toggle('rotated');
        });
      });

      const separators2 = this.profileContainer.nativeElement.querySelectorAll('.separator-containerE');
      separators2.forEach((separator2: HTMLElement) => {
        separator2.addEventListener('click', () => {
          const content = separator2.nextElementSibling as HTMLElement;
          const icon = separator2.querySelector('.separator-iconE') as HTMLElement;
          content.classList.toggle('visible');
          icon.classList.toggle('rotated');
        });
      });
    });
  }


  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }

  isform1Valid(): boolean {
    return (this.isNotEmpty(this.nombre) && this.nombre !== this.prevName) ||
           (this.correo !== this.prevCorreo && this.isNotEmpty(this.industria) && 
           this.industria !== this.prevIndustria) ||
           (this.isNotEmpty(this.ubicacion) && this.ubicacion !== this.prevUbicacion);
  }


  isMessageShown(): boolean {
    return !this.errorMessage && !this.successMessage;
  }

  obtenerEmpresaPorId(): void {
    this.isLoading = true;
    this.empresasService.obtenerEmpresaPorId().subscribe({
      next: (response) => {
        // Aquí asignamos los valores que se esperan del endpoint
        this.nombre = this.prevName = response.nombre || '';
        this.industria = this.prevIndustria = response.industria || '';
        this.correo = this.prevCorreo = response.email || '';
        this.ubicacion = this.prevUbicacion = response.ubicacion || '';
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener la empresa:', error);
        this.errorMessage = "¡Ups, ocurrio un error, intentalo más tarde!";
        this.clearMessagesAfterDelay();
        this.isLoading = false;
      }
    });
  }
  

  actualizarEmpresa(): void {
    this.isLoading = true;
    const userId = this.userService.getUserData();
    
    // Aquí asumimos que tienes los datos de la empresa que quieres actualizar
    const empresaData = {
      id: userId.sub,  // Asegúrate de tener el id de la empresa
      nombre: this.nombre,
      industria: this.industria,
      email: this.correo,
      ubicacion: this.ubicacion
    };
  
    this.empresasService.actualizarEmpresa(empresaData).subscribe({
      next: (response) => {
        console.log('Empresa actualizada con éxito:', response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al actualizar la empresa:', error);
        this.errorMessage = "¡Ups, ocurrio un error, intentalo más tarde!";
        this.clearMessagesAfterDelay();
        this.isLoading = false;
      }
    });
  }
  

  clearMessagesAfterDelay() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 5000);
  }
}
