import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { entorno } from '../enviroment/entorno';
import { Asistencia } from '../modelo/asistencia';
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  constructor(private http: HttpClient,
    private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPrivada}/asistencia`;
  private urlPublica: string = `${entorno.urlPublica}`;

  getAllAsistencia() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });
    // alert("GESTION= " + this.sessionStorage.getItem('token'))

    return this.http.get<Asistencia[]>(`${this.url}/read`, { headers });

  }

  asistenciaSearch(fechaMin: string, fechaMax: string, search: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    return this.http.get<any[]>(`${this.url}/asistenciaSearch?fechaMin=${fechaMin}&fechaMax=${fechaMax}&search=${search}`, { headers });

  }

  miAsistencia(usuId: number, fechaMin: string, fechaMax: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    console.log(`${this.url}/miAsistencia?usuId=${usuId}&fechaMin=${fechaMin}&fechaMax=${fechaMax}`)

    return this.http.get<any[]>(`${this.url}/miAsistencia?usuId=${usuId}&fechaMin=${fechaMin}&fechaMax=${fechaMax}`, { headers });

  }

  saveAll(asistencias: Asistencia[]): Observable<Asistencia[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });


    return this.http.post<Asistencia[]>(`${this.url}/saveList`, asistencias, {
      headers,
    });

  }


  historialArchivos() {

    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<any[]>(`${this.url}/historialArchivos`, { headers });

  }

}
