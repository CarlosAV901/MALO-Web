import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InegiService {
  private http = inject(HttpClient);

  getEstados(): Observable<any> {
    const url = 'https://gaia.inegi.org.mx/wscatgeo/v2/mgee/';
    return this.http.get<any>(url);
  }

  getMunicipios(cvegeo: string): Observable<any> {
    const url = `https://gaia.inegi.org.mx/wscatgeo/v2/mgem/${cvegeo}`;
    return this.http.get<any>(url);
  }

  getLocalidades(cvegeo: string): Observable<any> {
    const url = `https://gaia.inegi.org.mx/wscatgeo/v2/localidades/${cvegeo}`;
    return this.http.get<any>(url);
  }
}
