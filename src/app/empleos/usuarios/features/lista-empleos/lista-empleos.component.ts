import { Component, OnInit } from '@angular/core';
import { CardEmpleosComponent } from '../../ui/card-empleos/card-empleos.component';
import { CommonModule } from '@angular/common';
import { DetalleEmpleoComponent } from '../../ui/detalle-empleo/detalle-empleo.component';
import { TituloComponent } from "../../../../shared/ui/titulo/titulo.component";
import { HttpClient } from '@angular/common/http';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { SearchBarComponent } from '../../ui/search-bar/search-bar.component';

@Component({
  selector: 'app-lista-empleos',
  standalone: true,
  imports: [CommonModule, CardEmpleosComponent, DetalleEmpleoComponent, TituloComponent, LoaderComponent,SearchBarComponent],
  templateUrl: './lista-empleos.component.html',
  styleUrls: ['./lista-empleos.component.css']
})
export class ListaEmpleosComponent implements OnInit {
  empleos: any[] = [];
  filteredEmpleos: any[] = [];
  empresas: any[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  selectedEmpleoIndex: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEmpresas();
  }

  fetchEmpresas() {
    // Primero obtenemos las empresas
    this.http.get<any[]>('https://malo-backend-empresas.onrender.com/api/Empresa/GetEmpresa')
      .subscribe(
        (data: any[]) => {
          this.empresas = data;
          this.fetchEmpleos(); // Luego obtenemos los empleos
        },
        error => console.error('Error al cargar empresas:', error)
      );
  }

  fetchEmpleos() {
    this.http.get<any[]>('https://malo-backend-empleos.onrender.com/api/Empleo/GetEmpleos')
      .subscribe(
        (data: any[]) => {
          this.empleos = data.map(empleo => {
            const empresa = this.empresas.find(e => e.id === empleo.empresa_id);
            return {
              ...empleo,
              empresaNombre: empresa ? empresa.nombre : 'Empresa desconocida'
            };
          });
          this.filteredEmpleos = this.empleos; // Inicialmente muestra todos los empleos
          this.updateTotalPages();
        },
        error => console.error('Error al cargar empleos:', error)
      );
  }

  onFiltersApplied(filters: any) {
    console.log('Filtros aplicados:', filters); // Verificar filtros recibidos
    
    // Filtrar empleos según los criterios
    this.filteredEmpleos = this.empleos.filter(empleo => {
      return (
        (!filters.searchKeyword || empleo.titulo.toLowerCase().includes(filters.searchKeyword.toLowerCase())) &&
        (!filters.location || empleo.ubicacion.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.schedule || empleo.horario.toLowerCase() === filters.schedule.toLowerCase()) &&
        (!filters.salary || this.isSalaryMatch(empleo.salario_maximo, filters.salary))
      );
    });
  
    this.updateTotalPages(); // Actualizar el número de páginas en la lista filtrada
    this.currentPage = 1; // Reiniciar a la primera página después de aplicar el filtro
  }

  isSalaryMatch(salario: number, salaryFilter: string): boolean {
    const [min, max] = salaryFilter.split('-').map(s => parseInt(s.replace(/[^\d]/g, ''), 10));
    return salario >= min && salario <= max;
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
  }
}
