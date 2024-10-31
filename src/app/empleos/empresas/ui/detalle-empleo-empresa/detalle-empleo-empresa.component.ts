import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NotificationComponent } from '../../../../shared/ui/notification/notification.component';

@Component({
  selector: 'app-detalle-empleo-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './detalle-empleo-empresa.component.html',
  styleUrls: ['./detalle-empleo-empresa.component.css']
})
export class DetalleEmpleoEmpresaComponent implements OnChanges {
  @Input() empleo: any;
  modoEdicion: boolean = false;
  @Output() empleoEliminado = new EventEmitter<string>();
  @Output() empleoActualizado = new EventEmitter<any>();

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['empleo'] && this.empleo) {
      console.log('ID del empleo en detalle:', this.empleo.empleoId);
    }
  }

  activarEdicion() {
    this.modoEdicion = true;
  }

  guardarCambios() {

    if (!this.empleo.titulo || !this.empleo.descripcion || !this.empleo.ubicacion || this.empleo.salario_minimo === null || this.empleo.salario_minimo < 0 || !this.empleo.salario_maximo || !this.empleo.horario) {
      console.warn('Por favor, completa todos los campos obligatorios');
      this.errorMessage = 'Por favor, completa todos los campos obligatorios';
      this.clearMessagesAfterDelay();
      return;
    }
    if (this.empleo && this.empleo.empleoId) {
      const payload = {
        empleo_id: this.empleo.empleoId,
        titulo: this.empleo.titulo,
        descripcion: this.empleo.descripcion,
        ubicacion: this.empleo.ubicacion,
        salario_minimo: this.empleo.salario_minimo,
        salario_maximo: this.empleo.salario_maximo,
        horario: this.empleo.horario,
        multimediaNombre: this.empleo.multimediaNombre || '',
        multimediaTipo: this.empleo.multimediaTipo || '',
        multimediaContenido: this.empleo.multimediaContenido
      };
      this.http.post('https://malo-backend-empleos.onrender.com/api/Empleo/UpdateEmpleoById', payload, { responseType: 'text' })
        .subscribe({
          next: () => {
            console.log('Empleo actualizado con éxito');
            this.successMessage = 'Empleo actualizado con éxito';
            this.modoEdicion = false;
            this.empleoActualizado.emit(this.empleo); // Emitir el empleo actualizado
            this.clearMessagesAfterDelay();
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = `Error al eliminar el empleo: ${error.error}`;
            this.clearMessagesAfterDelay();
          }
        });
    } else {
      console.warn('No hay empleo seleccionado para actualizar.');
      this.errorMessage = 'No hay empleo seleccionado para eliminar.';
    }
  }

  eliminarEmpleo() {
    if (this.empleo && this.empleo.empleoId) {
      const payload = { empleoId: this.empleo.empleoId };
      this.http.post('https://malo-backend-empleos.onrender.com/api/Empleo/DeleteEmpleoById', payload, { responseType: 'text' })
        .subscribe({
          next: () => {
            console.log('Empleo eliminado con éxito');
            this.empleoEliminado.emit(this.empleo.empleoId); // Emite el ID del empleo eliminado
          },
          error: (error) => console.error('Error al eliminar el empleo:', error)
        });
    } else {
      console.warn('No hay empleo seleccionado para eliminar.');
    }
  }

  private clearMessagesAfterDelay() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000);
  }
}