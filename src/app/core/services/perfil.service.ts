import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private http = inject(HttpClient);
  private userService = inject(UserService);

  obtenerUsuarioPorId(): Observable<any> {
    const userData = this.userService.getUserData();
    const url = 'https://malo-backend.onrender.com/api/Usuario/ObtenerUsuarioPorId';
    const requestBody = { id: userData.sub };
    
    return this.http.post<any>(url, requestBody);
  }

  actualizarUsuario(usuarioData: any): Observable<any> {
    const url = `https://malo-backend.onrender.com/api/Usuario/ActualizarUsuario`;
    const token = this.userService.getToken();

    return this.http.post<any>(url, usuarioData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
  }

  actualizarMultimedia(formData: FormData): Observable<any> {
    const url = `https://malo-backend.onrender.com/api/Usuario/ActualizarMultimedia`;
    const token = this.userService.getToken();

    return this.http.post<any>(url, formData, {
        headers: {
            'Authorization': `Bearer ${token}`
            // Nota: No se agrega 'Content-Type' ya que Angular lo gestiona automáticamente para `FormData`
        }
    });
  }

  enviarDocumento(formData: FormData): Observable<any> {
    const url = 'https://malo-backend-documentos.onrender.com/api/Documento/PostAgregarDoc';
    return this.http.post(url, formData, { responseType: 'text' }); // Indica que la respuesta es texto
  }  

  obtenerDocumentos(): Observable<any[]> {
    const url = `https://malo-backend-documentos.onrender.com/api/Documento/GetDocumentos`;
    return this.http.get<any[]>(url);
  }
}
