import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-card-empleos',
  standalone: true, 
  templateUrl: './card-empleos.component.html',
  styleUrls: ['./card-empleos.component.css']
})
export class CardEmpleosComponent {
  @Input() empleo: any;

  ngOnInit() {
    console.log(this.empleo);  // Verificar qué datos recibe el componente
  }
}
