import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { NotificationComponent } from '../../../../shared/ui/notification/notification.component';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilService } from '../../../../core/services/perfil.service';
import { InegiService } from '../../../../core/services/inegi.service';
import { HabilidadesService } from '../../../../core/services/habilidades.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  // Datos usuario
  nombre = '';
  prevName = '';
  apellidos = '';
  prevApellidos = '';
  telefono = '';
  prevTel = '';
  fechaNacimiento = '';
  prevFechaNacimiento = '';
  correo = '';
  prevCorreo = '';
  experiencias = '';
  prevExperiencias = '';
  nuevaHabilidadDescripcion = '';
  telefonoTouched: boolean = false;
  emailTouched: boolean = false;
  nombreTouched: boolean = false;
  apellidosTouched: boolean = false;
  fechaNacimientoTouched: boolean = false;
  estadoTouched: boolean = false;
  municipioTouched: boolean = false;
  localidadTouched: boolean = false;
  emailButtonClicked: boolean = false;

  // Ubicación
  estados: any[] = [];
  municipios: any[] = [];
  localidades: any[] = [];
  estado: string = '';
  prevEstado = '';
  municipio: string = '';
  prevMunicipio = '';
  localidad: string = '';
  prevLocalidad = '';

  // Otros
  habilidades: any[] = [];
  prevHabilidades: string = '';
  router = inject(Router);
  perfilService = inject(PerfilService);
  inegiService = inject(InegiService);
  habilidadesService = inject(HabilidadesService);
  userService = inject(UserService);
  isLoading: boolean = false;
  emailSent: boolean = false;
  verificationCode: string = '';
  errorMessage: string = '';

  @ViewChild('profileContainer') profileContainer!: ElementRef;

  ngOnInit() {
    this.loadEstados();
    this.obtenerUsuarioPorId();

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


  // Funciones de validación
  isHabilidadValid(nuevaHabilidadDescripcion: string): boolean{
    return this.isNotEmpty(nuevaHabilidadDescripcion)
  }

  isPhoneValid(telefono: string): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(telefono);
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isNotEmpty(value: string): boolean {
    return value.trim().length > 0;
  }

  isform4Valid(): boolean{
    return this.isEmailValid(this.correo) && this.correo != this.prevCorreo
  }

  isform2Valid(): boolean {
    const isPhoneValid = this.isPhoneValid(this.telefono);
    const hasPhoneChanged = this.telefono !== this.prevTel;
    const hasNameChanged = this.nombre !== this.prevName;
    const hasApellidoChanged = this.apellidos !== this.prevApellidos;
    const hasFechaNacimientoChanged = this.fechaNacimiento !== this.prevFechaNacimiento;
  
    // Valida que el teléfono sea válido y que al menos uno de los valores haya cambiado
    return isPhoneValid && (hasPhoneChanged || hasNameChanged || hasApellidoChanged || hasFechaNacimientoChanged);
  }
  
  

  isform3Valid(): boolean {
    // Encuentra los nombres correspondientes al cvegeo seleccionado
    const estadoNombre = this.estados.find(e => e.cvegeo === this.estado)?.nomgeo || '';
    const municipioNombre = this.municipios.find(m => m.cvegeo === this.municipio)?.nomgeo || '';
    const localidadNombre = this.localidades.find(l => l.cvegeo === this.localidad)?.nomgeo || '';

    const isEstadoNotEmpty = !!this.estado;
    const isMunicipioNotEmpty = !!this.municipio;
    const isLocalidadNotEmpty = !!this.localidad;
  
    const hasEstadoChanged = estadoNombre !== this.prevEstado;
    const hasMunicipioChanged = municipioNombre !== this.prevMunicipio;
    const hasLocalidadChanged = localidadNombre !== this.prevLocalidad;
  
    // Valida que todos los campos no estén vacíos y que al menos uno de ellos haya cambiado
    return (isEstadoNotEmpty && isMunicipioNotEmpty && isLocalidadNotEmpty) &&
           (hasEstadoChanged || hasMunicipioChanged || hasLocalidadChanged);
  }

  isform1Valid(): boolean {
    return true
  }

  agregarHabilidad(): void {
    this.isLoading = true;
    this.habilidadesService.agregarHabilidad(this.nuevaHabilidadDescripcion).subscribe({
      next: (response) => {
        console.log('Habilidad agregada:', response);
        this.habilidades.push({ descripcion: this.nuevaHabilidadDescripcion });
        this.nuevaHabilidadDescripcion = '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al agregar habilidad:', error);
        this.isLoading = false;
      }
    });
  }

  eliminarHabilidad(id: number): void {
    this.habilidadesService.eliminarHabilidad(id).subscribe({
      next: (response) => {
        console.log('Habilidad eliminada:', response);
        this.habilidades = this.habilidades.filter(habilidad => habilidad.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar habilidad:', error);
      }
    });
  }

  loadEstados(): void {
    this.inegiService.getEstados().subscribe({
      next: (response) => {
        this.estados = response.datos;
      },
      error: (error) => {
        console.error('Error al obtener los estados', error);
      }
    });
  }

  onEstadoChange(cvegeo: string): void {
    if (cvegeo) {
      this.inegiService.getMunicipios(cvegeo).subscribe({
        next: (response) => {
          this.municipios = response.datos;
        },
        error: (error) => {
          console.error('Error al obtener los municipios', error);
        }
      });
    } else {
      this.municipios = [];
    }
  }

  onMunicipioChange(cvegeo: string): void {
    if (cvegeo) {
      this.inegiService.getLocalidades(cvegeo).subscribe({
        next: (response) => {
          this.localidades = response.datos;
        },
        error: (error) => {
          console.error('Error al obtener las localidades', error);
        }
      });
    } else {
      this.localidades = [];
    }
  }

  obtenerUsuarioPorId(): void {
    this.isLoading = true;
    this.perfilService.obtenerUsuarioPorId().subscribe({
      next: (response) => {
        console.log(response);
        this.nombre = this.prevName = response.nombre || '';
        this.apellidos = this.prevApellidos = response.apellido || '';
        this.telefono = this.prevTel = response.telefono || '';
        this.fechaNacimiento = this.prevFechaNacimiento = response.fecha_nacimiento ? this.formatDate(response.fecha_nacimiento) : '';
        this.correo = this.prevCorreo = response.email || '';
        this.prevEstado = response.estado || '';
        this.prevMunicipio = response.municipio || '';
        this.prevLocalidad = response.localidad || '';
        this.prevExperiencias = this.experiencias = response.experiencias || '';

        this.habilidades = response.habilidadesDescripciones
          ? response.habilidadesDescripciones.split(',').map((habilidad: string) => habilidad.trim())
          : [];
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error);
        this.isLoading = false;
      }
    });
  }

  actualizarUsuario(): void {
    const estadoNombre = this.estados.find(e => e.cvegeo === this.estado)?.nomgeo || '';
    const municipioNombre = this.municipios.find(m => m.cvegeo === this.municipio)?.nomgeo || '';
    const localidadNombre = this.localidades.find(l => l.cvegeo === this.localidad)?.nomgeo || '';
  
    const userId = this.userService.getUserData();
  
    // Crear objeto FormData para enviar los datos como form data
    const formData = new FormData();
    formData.append('usuarioId', userId.sub);
    formData.append('nombre', this.nombre);
    formData.append('email', this.correo);
    formData.append('apellido', this.apellidos);
    formData.append('telefono', this.telefono);
    formData.append('estado', estadoNombre || this.prevEstado);
    formData.append('municipio', municipioNombre || this.prevMunicipio);
    formData.append('localidad', localidadNombre || this.prevLocalidad);
    formData.append('descripcion', this.experiencias);
    formData.append('habilidades', '3,7,10');
    formData.append('archivo', new Blob(), '');  // Envía un archivo vacío si no tienes uno real
  
    this.isLoading = true;
    this.perfilService.actualizarUsuario(formData).subscribe({
      next: (response) => {
        console.log('Usuario actualizado con éxito:', response);
        this.obtenerUsuarioPorId();
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
        this.isLoading = false;
      }
    });
  }
  

  formatDate(fecha: string): string {
    return fecha.split('T')[0];
  }
}
