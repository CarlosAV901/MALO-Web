import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agrega FormsModule aquí
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() filtersApplied = new EventEmitter<any>();
  
  searchKeyword: string = '';
  location: string = '';
  schedule: string = '';
  salary: string = '';
  
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

  applyFilters(): void {
    const filters = {
      searchKeyword: this.searchKeyword,
      location: this.location,
      schedule: this.schedule,
      salary: this.salary,
    };
    this.filtersApplied.emit(filters);
  }
}
