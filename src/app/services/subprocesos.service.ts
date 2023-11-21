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
  ) { }

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

  searchSubprocesos(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Subprocesos[]>(
      `${this.url}/searchSubprocesos?search=${search}&est=${est}`,
      { headers }
    );
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

  getSubprocesosByProcEstado(estproc: number, estsub: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Subprocesos[]>(
      `${this.url}/getSubprocesosByProcEstado?estproc=${estproc}&estsub=${estsub}`,
      { headers }
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

  updateSubproceso(
    Subprocesos: Subprocesos,
    id: number
  ): Observable<Subprocesos> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.put<Subprocesos>(`${this.url}/update/${id}`, Subprocesos, {
      headers,
    });
  }
}
