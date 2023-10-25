import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { entorno } from '../enviroment/entorno';
import { Observable } from 'rxjs';
import { Institucion } from '../modelo/Institucion';

@Injectable({
  providedIn: 'root',
})
export class InstitucionService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/institucion`;

  saveInstitucion(Institucion: Institucion): Observable<Institucion> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<Institucion>(`${this.url}/create`, Institucion, {
      headers,
    });
  }

  getAllInstituciones() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<Institucion[]>(`${this.url}/read`, { headers });
  }
}
