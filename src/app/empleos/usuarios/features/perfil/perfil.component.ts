import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  // datos usuario
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

  // ubicación
  estados: any[] = [];
  municipios: any[] = [];
  localidades: any[] = [];
  estado: string = '';
  prevEstado = '';
  municipio: string = '';
  prevMunicipio = '';
  localidad: string = '';
  prevLocalidad = '';

  // otros
  habilidades: any[] = [];
  prevHabilidades: string = '';
  router = inject(Router);
  http = inject(HttpClient);
  userService = inject(UserService);
  isLoading: boolean = false;
  emailSent: boolean = false;
  verificationCode: string = '';
  errorMessage: string = '';

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

  // Obtener estados al iniciar
  getEstados(): void {
    this.http.get<any>('https://gaia.inegi.org.mx/wscatgeo/v2/mgee/').subscribe(
      response => {
        this.estados = response.datos;
      },
      error => {
        console.error('Error al obtener los estados', error);
      }
    );
  }

  // Obtener municipios al seleccionar estado
  onEstadoChange(cvegeo: string): void {
    if (cvegeo) {
      this.http.get<any>(`https://gaia.inegi.org.mx/wscatgeo/v2/mgem/${cvegeo}`).subscribe(
        response => {
          this.municipios = response.datos;
        },
        error => {
          console.error('Error al obtener los municipios', error);
        }
      );
    } else {
      this.municipios = [];
    }
  }

  // Obtener localidades al seleccionar municipio
  onMunicipioChange(cvegeo: string): void {
    if (cvegeo) {
      this.http.get<any>(`https://gaia.inegi.org.mx/wscatgeo/v2/localidades/${cvegeo}`).subscribe(
        response => {
          this.localidades = response.datos;
        },
        error => {
          console.error('Error al obtener los municipios', error);
        }
      );
    } else {
      this.localidades = [];
    }
  }

  @ViewChild('profileContainer') profileContainer!: ElementRef;

  ngOnInit() {
    this.getEstados();
    this.obtenerUsuarioPorId();

    setTimeout(() => { // Espera para asegurar que el DOM esté listo
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

  eliminarHabilidad(id: number): void {
    this.http.post<any>(
      'https://malo-backend.onrender.com/api/Habilidad/eliminar-habilidad', 
      { id }, 
      { responseType: 'text' as 'json' } // Cambiamos el tipo de respuesta esperada a texto
    ).subscribe({
      next: (response) => {
        console.log('Habilidad eliminada:', response);
        // Actualiza la lista de habilidades eliminando la que fue eliminada
        this.habilidades = this.habilidades.filter(habilidad => habilidad.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar habilidad:', error);
      }
    });
  }

  agregarHabilidad(): void {
    this.isLoading = true;
    const nuevaHabilidad = { descripcion: this.nuevaHabilidadDescripcion };
    this.http.post<any>('https://malo-backend.onrender.com/api/Habilidad/insertar-habilidad', nuevaHabilidad, { responseType: 'text' as 'json' }).subscribe({
      next: (response) => {
        console.log('Habilidad agregada:', response);
        // Añade la habilidad a la lista y limpia el campo de entrada
        this.habilidades.push({ descripcion: this.nuevaHabilidadDescripcion });
        this.nuevaHabilidadDescripcion = '';
        this.isLoading = false
      },
      error: (error) => {
        console.error('Error al agregar habilidad:', error);
      }
    });
  }


  // Método para obtener datos de usuario por ID
  obtenerUsuarioPorId(): void {
    const userData = this.userService.getUserData();
    const url = 'https://malo-backend.onrender.com/api/Usuario/ObtenerUsuarioPorId';
    const requestBody = { id: userData.sub }; // Ajusta el ID según sea necesario
    this.isLoading = true;

    this.http.post<any>(url, requestBody).subscribe({
      next: (response) => {
        console.log(response)
        // Asigna los valores recibidos a las propiedades
        this.nombre = this.prevName = response.nombre || '';
        this.apellidos = this.prevApellidos = response.apellido || '';
        this.telefono = this.prevTel = response.telefono || '';
        this.fechaNacimiento = this.prevFechaNacimiento = response.fecha_nacimiento ? this.formatDate(response.fecha_nacimiento) : '';
        this.correo = this.prevCorreo = response.email || '';
        this.prevEstado = response.estado || '';
        this.prevMunicipio = response.municipio || '';
        this.prevLocalidad = response.localidad || '';
        this.prevExperiencias = this.experiencias = response.experiencias || '';

        // Convierte las habilidades en un array, separadas por comas y elimina espacios adicionales
        this.habilidades = response.habilidadesDescripciones
          ? response.habilidadesDescripciones.split(',').map((habilidad:string) => habilidad.trim())
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
    // Encuentra los nombres correspondientes al cvegeo seleccionado
    const estadoNombre = this.estados.find(e => e.cvegeo === this.estado)?.nomgeo || '';
    const municipioNombre = this.municipios.find(m => m.cvegeo === this.municipio)?.nomgeo || '';
    const localidadNombre = this.localidades.find(l => l.cvegeo === this.localidad)?.nomgeo || '';

    const userId = this.userService.getUserData();
    const userData = this.userService.getToken();
    const url = 'https://malo-backend.onrender.com/api/Usuario/ActualizarUsuario';
    const requestBody = {
      usuarioId: userId.sub,
      nombre: this.nombre,
      email: this.correo,
      apellido: this.apellidos,
      telefono: this.telefono,
      estado: estadoNombre || this.prevEstado,
      municipio: municipioNombre || this.prevMunicipio,
      localidad: localidadNombre || this.prevLocalidad,
      descripcion:this.experiencias,
      habilidades: '3,7,10',
      imagen_perfil: ''
    };
    
    this.http.post<any>(url, requestBody, {
      headers: {
        'Authorization': `Bearer ${userData}`,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        console.log('Usuario actualizado con éxito:', response);
        this.obtenerUsuarioPorId();
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    });
  }  

  // Método para formatear la fecha en yyyy-MM-dd
  formatDate(fecha: string): string {
    return fecha.split('T')[0]; // Divide la cadena en 'T' y toma solo la parte de la fecha
  }
}
