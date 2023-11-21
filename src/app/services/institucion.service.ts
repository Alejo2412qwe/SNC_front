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
  ) { }

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

  getInstitucionByTipId(tipId: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    console.log(`${this.url}/getInstitucionByTipId/${tipId}`);

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Institucion[]>(
      `${this.url}/getInstitucionByTipId/${tipId}`,
      { headers }
    );
  }

  getInstitucionesByEstado(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Institucion[]>(
      `${this.url}/getInstitucionesByEstado?est=${est}`,
      { headers }
    );
  }

  getInstitucionesByTipId(tipid: number, instid: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Institucion[]>(
      `${this.url}/getInstitucionesByTipId?tipid=${tipid}&instid=${instid}`,
      { headers }
    );
  }

  getInstitucionById(id: number): Observable<Institucion> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    return this.http.get<Institucion>(`${this.url}/getInstitucionById?id=${id}`, {
      headers,
    });
  }

  searchInstitucion(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Institucion[]>(
      `${this.url}/searchInstitucion?search=${search}&est=${est}`,
      { headers }
    );
  }

  updateInstitucion(
    Institucion: Institucion,
    id: number
  ): Observable<Institucion> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.put<Institucion>(`${this.url}/update/${id}`, Institucion, {
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
