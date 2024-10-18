import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  // Método para obtener los datos del usuario desde el token
  getUserData(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded; // Retorna la información decodificada del usuario
    }
    return null;
  }
}
