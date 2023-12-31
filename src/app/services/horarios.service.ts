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


  getHorarios() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    return this.http.get<Horarios[]>(this.url + '/read',{headers});
  }

  agregarHorario(horario: Horarios): Observable<Horarios> {

    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Horarios>(`${this.url}/create`, horario, { headers });

  }

  actualizarHorario(id: number, horario: Horarios): Observable<Horarios> {

    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización

    return this.http.put<Horarios>(`${this.url}/update/${id}`, horario, {headers});

  }

  eliminarHorario(id: number) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    return this.http.delete(`${this.url}/delete/${id}`);
  }

}
