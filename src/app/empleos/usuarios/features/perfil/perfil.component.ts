import { Component, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailService } from '../../../../core/services/email.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements AfterViewInit {
  //datos usuario
  nombre: string = '';
  apellidos = '';
  telefono = '';
  fechaNacimiento = '';
  correo = '';
  contrasena = '';
  confirmPass = '';
  codigoInp = '';
  telefonoTouched: boolean = false;
  emailTouched: boolean = false;
  passwordTouched: boolean = false;
  confirmPassTouched: boolean = false;
  nombreTouched: boolean = false;
  apellidosTouched: boolean = false;
  fechaNacimientoTouched: boolean = false;
  estadoTouched: boolean = false;
  municipioTouched: boolean = false;
  localidadTouched: boolean = false;
  codigoInpTouched: boolean = false;
  emailButtonClicked: boolean = false;
  //ubicacion
  estados: any[] = [];
  municipios: any[] = [];
  localidades: any[] = [];
  estado: string = '';
  municipio: string= '';
  localidad: string= '';
  //otros
  router = inject(Router);
  http = inject(HttpClient);
  isLoading: boolean = false;
  emailSent: boolean = false;
  verificationCode: string = '';
  errorMessage: string = '';

  isPhoneValid(telefono: string): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(telefono);
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isCodigoValid(codigo: string,  verificationCode: string): boolean {
    return  codigo.length === 6  && codigo === verificationCode;
  }

  isPasswordValid(password: string): boolean {
    return password.length >= 5;
  }
  
  doPasswordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  // Función para verificar si un campo no está vacío
  isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }

  //Obtener estados al iniciar
  getEstados(): void{
    this.http.get<any>('https://gaia.inegi.org.mx/wscatgeo/v2/mgee/').subscribe(response => {
      this.estados = response.datos;
    }, error =>{
      console.error('Error al obtener los estados', error);
    })
  }
  //obtener municipios al seleccionar estado
  onEstadoChange(cvegeo: string): void{
    if(cvegeo){
      this.http.get<any>(`https://gaia.inegi.org.mx/wscatgeo/v2/mgem/${cvegeo}`).subscribe(response => {
        this.municipios = response.datos
      }, error =>{
        console.error('Error al obtener los municipios', error);
      })
    }else{
      this.municipios = [];
    }
  }
  //obtener localidades al seleccionar municipio
  onMunicipioChange(cvegeo: string): void{
    if(cvegeo){
      this.http.get<any>(`https://gaia.inegi.org.mx/wscatgeo/v2/localidades/${cvegeo}`).subscribe(response => {
        this.localidades = response.datos
      }, error =>{
        console.error('Error al obtener los municipios', error);
      })
    }else{
      this.localidades = [];
    }
  }

  @ViewChild('profileContainer') profileContainer!: ElementRef;

  ngAfterViewInit() {
    this.getEstados();
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
  }

  //Enviar correo
  constructor(private emailService: EmailService){}
  sendEmail(){
    this.verificationCode = this.emailService.generateRandomCode();
    this.isLoading = true;

    this.emailService.sendEmail(this.nombre, this.verificationCode, this.correo)
    .then(()=>{
      this.isLoading = false;
      this.emailSent = true;
      this.emailButtonClicked = true;

      //Activar temporizador 60s
      setTimeout(() => {
        this.verificationCode = '';
        this.emailButtonClicked = false;
      }, 180000);

      setTimeout(() => (this.emailSent = false), 3000);
    }).catch((error) =>{
      this.isLoading =false;
      this.emailButtonClicked = false;
      console.error('Error al enviar el código:', error)
    })
  }
}
