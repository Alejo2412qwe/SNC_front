import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { Vacaciones } from '../modelo/vacaciones';
import { SessionStorageService } from './session-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPrivada}/vacaciones`

  private token = this.sessionStorage.getItem('token');


  getVacaciones() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    return this.http.get<Vacaciones[]>(this.url + '/read', { headers });
  }

  agregarVacaciones(id: number, vacaciones: Vacaciones): Observable<Vacaciones> {

    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Vacaciones>(`${this.url}/create?id=${id}`, vacaciones, { headers });

  }

  //verifica el estado de vacaciones
  getVacacionesByUsuId(id: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Vacaciones[]>(
      `${this.url}/getVacacionesByUsuId?id=${id}`,
      { headers }
    );
  }

  actualizarVacaciones(id: number, vacaciones: Vacaciones): Observable<Vacaciones> {

    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización

    return this.http.put<Vacaciones>(`${this.url}/update/${id}`, vacaciones, { headers });

  }

  eliminarVacaciones(id: number) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    return this.http.delete(`${this.url}/delete/${id}`);
  }

  searchVacacionesData(search: string, est: number) {

    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Vacaciones[]>(`${this.url}/searchUsersData?search=${search}&est=${est}`, { headers });

  }

  updateEst(id: number, est: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}`
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<void>(`${this.url}/updateEst?id=${id}&est=${est}`, null, { headers });
  }

  allVacData(est: number) {

    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Vacaciones[]>(`${this.url}/allUsersData?est=${est}`, { headers });

  }
}
