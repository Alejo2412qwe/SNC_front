import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { Periodo } from '../modelo/periodo';
import { SessionStorageService } from './session-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPublica}/Periodo`
  private token = this.sessionStorage.getItem('token');


  agregarPeriodo(Periodo: Periodo): Observable<Periodo> {

    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Periodo>(`${this.url}/create`, Periodo, { headers });

  }

  actualizarPeriodo(id: number, periodo: Periodo): Observable<Periodo> {

    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización

    return this.http.put<Periodo>(`${this.url}/update/${id}`, periodo, { headers });

  }

  eliminarPeriodo(id: number) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    return this.http.delete(`${this.url}/delete/${id}`);
  }

  buscarPeriodo(fecha: string): Observable<Periodo[]> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Puedes ajustar los parámetros según tu API
    const params = new HttpParams().set('fecha', fecha);

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Periodo[]>(`${this.url}/buscarPeriodo`, { headers, params });
  }

}




