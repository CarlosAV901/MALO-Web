import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-card-empleos',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './card-empleos.component.html',
  styleUrls: ['./card-empleos.component.css']
})
export class CardEmpleosComponent {
  @Input() empleo: any;
  @Input() selected: boolean = false; // Nuevo input para indicar si la tarjeta está seleccionada
  @Output() cardClick = new EventEmitter<void>(); 

  ngOnInit() {
    console.log(this.empleo);  // Verificar qué datos recibe el componente
  }

  onCardClick() {
    this.cardClick.emit(); // Emitir el evento cuando se hace clic en la tarjeta
  }
}
