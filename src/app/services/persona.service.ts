import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService
import { Persona } from '../modelo/persona';
import { entorno } from '../enviroment/entorno';



@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPrivada}/persona`
  // private token = this.sessionStorage.getItem('token');



  registrarPersona(persona: Persona): Observable<Persona> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Persona>(`${this.url}/create`, persona, { headers });
  }

  update(id: number, persona: Persona): Observable<Persona> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Persona>(`${this.url}/update?id=${id}`, persona, { headers });
  }

  delete(id: number) {

  }

  cedulaUnica(ci: string) {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP GET con el encabezado de autorización
    return this.http.get<boolean>(`${this.url}/cedulaUnica?ci=${ci}`, { headers });
  }


  getPersonas(): Observable<Persona[]> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    return this.http.get(this.url + "/listar").pipe(map(response => response as Persona[]));
  }


}
