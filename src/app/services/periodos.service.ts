import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { entorno } from '../enviroment/entorno';
import { Periodos } from '../modelo/Periodos';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PeriodosService {

  constructor(private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) { }

  private url: string = `${entorno.urlPrivada}/periodo`;

  savePeriodos(Periodos: Periodos): Observable<Periodos> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<Periodos>(`${this.url}/create`, Periodos, {
      headers,
    });
  }

  searchPeriodos(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Periodos[]>(
      `${this.url}/searchPeriodos?search=${search}&est=${est}`,
      { headers }
    );
  }

  getAllPeriodos() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<Periodos[]>(`${this.url}/read`, { headers });
  }

  updateEst(id: number, est: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<void>(
      `${this.url}/updateEstPeriodo?id=${id}&est=${est}`,
      null,
      { headers }
    );
  }

  getPeriodosByEstado(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Periodos[]>(
      `${this.url}/getPeriodoByEstado?est=${est}`,
      { headers }
    );
  }

  updatePeriodos(Periodos: Periodos, id: number): Observable<Periodos> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.put<Periodos>(`${this.url}/update/${id}`, Periodos, {
      headers,
    });
  }

}