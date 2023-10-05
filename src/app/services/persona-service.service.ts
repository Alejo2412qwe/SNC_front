import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, of } from 'rxjs';
import { API_URL } from '../../assets/config//api-config';
import { SessionStorageService } from 'ngx-webstorage';
import { Persona } from '../modelo/persona';



@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

  private url: string = `${API_URL}/persona`
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private token = this.sessionStorage.retrieve('token');


  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  createPersona(persona: Persona): Observable<Persona> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Persona>(`${this.url}/create`, persona, { headers });
  }

}
