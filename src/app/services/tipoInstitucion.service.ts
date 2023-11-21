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

  searchTipoInstitucion(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<TipoInstitucion[]>(
      `${this.url}/searchTipoInstitucion?search=${search}&est=${est}`,
      { headers }
    );
  }

  getAllTipoInstituciones() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<TipoInstitucion[]>(`${this.url}/read`, { headers });
  }

  getTipoInstitucionByEstado(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<TipoInstitucion[]>(
      `${this.url}/getTipoInstitucionByEstado?est=${est}`,
      { headers }
    );
  }

  updateTipoInstitucion(
    TipoInstitucion: TipoInstitucion,
    id: number
  ): Observable<TipoInstitucion> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.put<TipoInstitucion>(
      `${this.url}/update/${id}`,
      TipoInstitucion,
      {
        headers,
      }
    );
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
