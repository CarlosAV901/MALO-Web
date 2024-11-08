import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HabilidadesService {
  private http = inject(HttpClient);

  agregarHabilidad(descripcion: string): Observable<any> {
    const url = 'https://malo-backend.onrender.com/api/Habilidad/insertar-habilidad';
    const nuevaHabilidad = { descripcion };
    return this.http.post<any>(url, nuevaHabilidad, { responseType: 'text' as 'json' });
  }

  eliminarHabilidad(id: number): Observable<any> {
    const url = 'https://malo-backend.onrender.com/api/Habilidad/eliminar-habilidad';
    return this.http.post<any>(url, { id }, { responseType: 'text' as 'json' });
  }

  obtenerHabilidades(): Observable<any> {
    const url = 'https://malo-backend.onrender.com/api/Habilidad/Obtener-habilidades';
    return this.http.post<any>(url, {}); // Asegúrate de enviar un cuerpo vacío si es necesario
  }
}
