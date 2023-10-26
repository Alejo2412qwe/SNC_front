import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { TipoInstitucion } from '../modelo/tipoInstitucion';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class tipoInstitucionService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/tipoinstitucion`;

  saveTipoInstitucion(
    tipInstitucion: TipoInstitucion
  ): Observable<TipoInstitucion> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<TipoInstitucion>(
      `${this.url}/create`,
      tipInstitucion,
      {
        headers,
      }
    );
  }

  getAllTipoInstituciones() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<TipoInstitucion[]>(`${this.url}/read`, { headers });
  }
}
