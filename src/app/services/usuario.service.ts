import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService
import { entorno } from '../enviroment/entorno';
import { Usuario } from '../modelo/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPublica}/usuario`
  private token = this.sessionStorage.getItem('token');



  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Usuario>(`${this.url}/register`, usuario, { headers });
  }
}
