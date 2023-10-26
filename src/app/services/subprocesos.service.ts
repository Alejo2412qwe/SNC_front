import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { Subprocesos } from '../modelo/subprocesos';
import { SessionStorageService } from './session-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubprocesosService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/subprocesos`;

  saveSubprocesos(Subproceso: Subprocesos): Observable<Subprocesos> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<Subprocesos>(`${this.url}/create`, Subproceso, {
      headers,
    });
  }

  getSubprocesosByProcesoId(procId: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Subprocesos[]>(
      `${this.url}/getSubprocesosByProcId/${procId}`,
      { headers }
    );
  }

  getAllSubProcesos() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<Subprocesos[]>(`${this.url}/read`, { headers });
  }
}
