import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../../../MALO-Web/src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PEmpresasService {
    private http = inject(HttpClient);
    private userService = inject(UserService);
    
    obtenerEmpresaPorId(): Observable<any> {
        const empresaData = this.userService.getUserData(); // Método para obtener los datos del usuario
        const url = 'https://malo-backend-empresas.onrender.com/api/Empresa/GetEmpresaPorId';
        const empresaId = empresaData.sub; // Asumiendo que el ID de la empresa está en 'sub'
    
        // Enviar solo el ID, no todo el objeto
        const requestBody = { id: empresaId };
    
        return this.http.post<any>(url, requestBody);
    }
    

      actualizarEmpresa(empresaData: any): Observable<any> {
        const url = 'https://malo-backend-empresas.onrender.com/api/Empresa/actualizar-empresa';
        
        // Enviar los datos de la empresa en el cuerpo de la solicitud
        return this.http.post<any>(url, empresaData);
      }      
}
