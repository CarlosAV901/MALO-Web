import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NosotrosComponent } from './nosotros/nosotros.component';  // Importa el componente independiente

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, NosotrosComponent]  // Importa aquí el componente independiente
})
export class DashboardComponent {
}
