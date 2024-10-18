import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isTokenExpired() === false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable para que otros componentes se suscriban

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserData(): any {
    const token = this.getToken();
    if (token && !this.isTokenExpired()) {
      const decoded: any = jwtDecode(token);
      return decoded;
    }
    return null;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        this.clearToken();
        return true;
      }
      return false;
    }
    return true; // No hay token, por lo que se considera expirado
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false); // Notifica que el usuario ha cerrado sesión
  }

  // Método para actualizar el estado de autenticación
  setAuthenticationState(state: boolean): void {
    this.isAuthenticatedSubject.next(state);
  }
}