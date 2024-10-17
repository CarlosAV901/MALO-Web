import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { NavbarComponent } from '../shared/ui/layout/navbar.component';  // Importa el NavbarComponent
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule,BusquedaComponent ,NosotrosComponent, NavbarComponent, FeatureSectionComponent]  // Agrega NavbarComponent a los imports
})
export class DashboardComponent {
}
