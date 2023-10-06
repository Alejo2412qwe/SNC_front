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

  private url: string = `${entorno.urlPublica}/persona`
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private token = this.sessionStorage.getItem('token');



  createPersona(persona: Persona): Observable<Persona> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Persona>(`${this.url}/create`, persona, { headers });
  }

}
