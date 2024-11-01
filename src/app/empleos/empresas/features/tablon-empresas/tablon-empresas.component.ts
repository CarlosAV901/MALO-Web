import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEmpleosEmpresaComponent } from '../../ui/card-empleos-empresa/card-empleos-empresa.component';
import { DetalleEmpleoEmpresaComponent } from '../../ui/detalle-empleo-empresa/detalle-empleo-empresa.component';
import { TituloComponent } from '../../../../shared/ui/titulo/titulo.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../core/services/user.service';
import { NotificationComponent } from '../../../../shared/ui/notification/notification.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tablon-empresas',
  standalone: true,
  imports: [CommonModule, CardEmpleosEmpresaComponent,FormsModule, DetalleEmpleoEmpresaComponent, TituloComponent, NotificationComponent],
  templateUrl: './tablon-empresas.component.html',
  styleUrls: ['./tablon-empresas.component.css']
})

export class TablonEmpresasComponent implements OnInit {
  empleos: any[] = [];
  filteredEmpleos: any[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  totalPages = 1;
  selectedEmpleoIndex: number | null = null;
  empleoSeleccionado: any = null;
  isLoading = false;

  successMessage = '';
  errorMessage = '';

  ordenFecha: 'asc' | 'desc' = 'asc';

  isDetalleVisibleMobile = false; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    const empresaId = this.userService.getUserData()?.sub;
    if (empresaId) {
      this.fetchEmpleos(empresaId);
    } else {
      console.error('No se encontró el ID de la empresa autenticada.');
    }
  }

  fetchEmpleos(empresaId: string) {
    this.http.get<any[]>('https://malo-backend-empleos.onrender.com/api/Empleo/GetEmpleos')
      .subscribe(
        (data: any[]) => {
          this.empleos = data.filter(empleo => empleo.empresa_id === empresaId);
          this.filteredEmpleos = this.empleos;
          this.ordenarEmpleos();
          this.updateTotalPages();
        },
        error => console.error('Error al cargar empleos:', error)
      );
  }

  ordenarEmpleos() {
    this.filteredEmpleos.sort((a, b) => {
      const fechaA = new Date(a.fecha_publicacion).getTime();
      const fechaB = new Date(b.fecha_publicacion).getTime();
      return this.ordenFecha === 'asc' ? fechaA - fechaB : fechaB - fechaA;
    });
    this.updateTotalPages();
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(this.filteredEmpleos.length / this.itemsPerPage);
  }

  get paginatedEmpleos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmpleos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onCardClick(index: number) {
    this.selectedEmpleoIndex = index;
    this.empleoSeleccionado = this.empleos[index];

    if(window.innerWidth <= 768){
      this.isDetalleVisibleMobile = true;
    }
  }

  closeDetalleMobile() {
    this.isDetalleVisibleMobile = false;
  }

  onPublicarEmpleo() {
    this.router.navigate(['empresa/crear']);
  }

  actualizarListaEmpleos(empleoId: string) {
    this.empleos = this.empleos.filter(empleo => empleo.empleoId !== empleoId);
    this.filteredEmpleos = this.empleos;
    this.ordenarEmpleos();
    this.updateTotalPages();
    this.selectedEmpleoIndex = null;
    this.successMessage = 'Se eliminó el empleo correctamente';
    this.clearMessagesAfterDelay();
  }

  actualizarEmpleo(empleoActualizado: any) {
    const index = this.empleos.findIndex(empleo => empleo.empleoId === empleoActualizado.empleoId);
    if (index !== -1) {
      this.empleos[index] = empleoActualizado;
      this.ordenarEmpleos();
      this.successMessage = 'Empleo actualizado con éxito';
      this.clearMessagesAfterDelay();
    }
  }

  clearMessagesAfterDelay() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
