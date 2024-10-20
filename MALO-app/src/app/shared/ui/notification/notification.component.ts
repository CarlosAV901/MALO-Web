import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-notification',
  standalone: true,  // Indicamos que es standalone
  imports: [CommonModule],  // Agrega CommonModule a las imports
  template: `
    <div *ngIf="message" class="notification" [ngClass]="{ 'error': isError }">
      {{ message }}
    </div>
  `,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() message: string = '';  // Mensaje a mostrar
  @Input() isError: boolean = false;  // Define si es un error
}
