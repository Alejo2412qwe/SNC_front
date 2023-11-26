import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoPermiso } from '../modelo/tipopermiso';
import { entorno } from '../enviroment/entorno';
import { SessionStorageService } from './session-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoPermisoService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) { }

  private url: string = `${entorno.urlPrivada}/tipopermiso`;

  saveTipoPermiso(TipoPermiso: TipoPermiso): Observable<TipoPermiso> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<TipoPermiso>(`${this.url}/create`, TipoPermiso, {
      headers,
    });
  }

  searchTipopermiso(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<TipoPermiso[]>(
      `${this.url}/searchTipopermiso?search=${search}&est=${est}`,
      { headers }
    );
  }

  getAllTiposPermiso() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<TipoPermiso[]>(`${this.url}/read`, { headers });
  }

  getTipoPermisoByEstado(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<TipoPermiso[]>(
      `${this.url}/getTipoPermisoByEstado?est=${est}`,
      { headers }
    );
  }

  updateTipoPermiso(
    TipoPermiso: TipoPermiso,
    id: number
  ): Observable<TipoPermiso> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.put<TipoPermiso>(`${this.url}/update/${id}`, TipoPermiso, {
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

  getTipoPermsioById(id: number): Observable<TipoPermiso> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    return this.http.get<TipoPermiso>(`${this.url}/getTipoPermsioById?id=${id}`, {
      headers,
    });
  }
}
