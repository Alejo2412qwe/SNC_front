import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService
import { Horarios } from '../modelo/horario';
import { entorno } from '../enviroment/entorno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPrivada}/horarios`
  private token = this.sessionStorage.getItem('token');

  agregarHorario(horario: Horarios): Observable<Horarios> {

    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Horarios>(`${this.url}/create`, horario, { headers });

  }


  // Método para buscar horarios por hora de ingreso
  buscarporHora(horaIngreso: string): Observable<Horarios[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    return this.http.get<Horarios[]>(`${this.url}/searchByHour/${horaIngreso}`, { headers });
  }

  actualizaHorario(horario: Horarios, id: number): Observable<Horarios> {

    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización

    return this.http.put<Horarios>(`${this.url}/update/${id}`, horario, { headers });

  }

  eliminarHorario(id: number) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    return this.http.delete(`${this.url}/delete/${id}`);
  }

  updateEst(id: number, est: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<void>(
      `${this.url}/updateEst?id=${id}&est=${est}`,
      null,
      { headers }
    );
  }

  getHorariosByEstado(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Horarios[]>(
      `${this.url}/getProcesosByHorarios?est=${est}`,
      { headers }
    );
  }


  getHorarioById(id: number): Observable<Horarios> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    return this.http.get<Horarios>(`${this.url}/getHorarioById?id=${id}`, {
      headers,
    });
  }


}

