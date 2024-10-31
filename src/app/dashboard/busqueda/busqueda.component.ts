import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Agrega FormsModule y CommonModule aquí
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  query: string = '';
  suggestions: string[] = [];
  empleos: string[] = [
    'Vendedor de pollos',
    'Vendedor de coches',
    'Limpiador de baño',
    'Desarrollador web',
    'Ingeniero de software'
  ];

  constructor(private router: Router) { }

  onInputChange() {
    this.suggestions = this.empleos.filter(emp =>
      emp.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  buscarEmpleo() {
    this.router.navigate(['/usuario'], { queryParams: { search: this.query } });
  }
}
