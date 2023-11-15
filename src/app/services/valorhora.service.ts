import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { entorno } from '../enviroment/entorno';
import { ValorHora } from '../modelo/valorhora';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValorHoraService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/valorhora`;

  saveValorHora(ValorHora: ValorHora): Observable<ValorHora> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<ValorHora>(`${this.url}/create`, ValorHora, {
      headers,
    });
  }

  getValorHoraByEstado(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<ValorHora[]>(
      `${this.url}/getValoresByEstado?est=${est}`,
      { headers }
    );
  }

  getValorUnico() {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });
  
    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<number>(`${this.url}/getNumeroDeRegistros`, {
      headers,
    });
  }

  updateValor(ValorHora: ValorHora, id: number): Observable<ValorHora> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.put<ValorHora>(`${this.url}/update/${id}`, ValorHora, {
      headers,
    });
  }

  updateEst(id: number, est: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<void>(
      `${this.url}/updateEst?id=${id}&est=${est}`,
      null,
      { headers }
    );
  }
}
