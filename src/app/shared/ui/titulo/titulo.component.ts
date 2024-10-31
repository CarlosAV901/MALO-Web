import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.css'
})
export class TituloComponent {
  @Input() primeraPalabra: string = '';
  @Input() segundaPalabra: string = '';
}
