import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { entorno } from '../enviroment/entorno';
import { Funciones } from '../modelo/funciones';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) { }

  private url: string = `${entorno.urlPrivada}/funciones`;

  saveFunciones(Funciones: Funciones): Observable<Funciones> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<Funciones>(`${this.url}/create`, Funciones, {
      headers,
    });
  }

  getAllFunciones() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<Funciones[]>(`${this.url}/read`, { headers });
  }

  searchFunciones(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Funciones[]>(
      `${this.url}/searchFunciones?search=${search}&est=${est}`,
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
      `${this.url}/updateEstFuncion?id=${id}&est=${est}`,
      null,
      { headers }
    );
  }

  getFuncionesByEstado(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    console.log(`${this.url}/getFuncionesByEstado/${est}`);

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Funciones[]>(
      `${this.url}/getFuncionesByEstado?est=${est}`,
      { headers }
    );
  }

  updateFunciones(Funciones: Funciones, id: number): Observable<Funciones> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.put<Funciones>(`${this.url}/update/${id}`, Funciones, {
      headers,
    });
  }

}
