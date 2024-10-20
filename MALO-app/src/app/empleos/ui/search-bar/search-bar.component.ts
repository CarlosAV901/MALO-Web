import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para ngClass

@Component({
  selector: 'app-search-bar',
  standalone: true, // Standalone component
  imports: [CommonModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  isMobile: boolean = false;
  isFiltersOpen: boolean = false;

  constructor() {
    this.checkIfMobile();
  }

  checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleFilters(): void {
    this.isFiltersOpen = !this.isFiltersOpen;
  }
}
