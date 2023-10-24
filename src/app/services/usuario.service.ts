import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService
import { entorno } from '../enviroment/entorno';
import { Usuario } from '../modelo/usuario';
import { Observable } from 'rxjs';
import { LoginRequest } from '../modelo/loginRequest';
import { AuthResponse } from '../modelo/authResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPrivada}/usuario`
  private urlPublica: string = `${entorno.urlPublica}`
  // private token = this.sessionStorage.getItem('token');



  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Usuario>(`${this.url}/register`, usuario, { headers });
  }

  logIn(login: LoginRequest): Observable<AuthResponse> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<AuthResponse>(`${this.urlPublica}/login`, login, { headers });
  }

  usuarioValido(user: string) {
    const headers = new HttpHeaders({
    });

    return this.http.get<boolean>(`${this.urlPublica}/usuarioValido?user=${user}`, { headers });
  }

  usuarioUnico(user: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}`
    });

    console.log(`${this.url}/usuarioUnico?user=${user}`)

    return this.http.get<boolean>(`${this.url}/usuarioUnico?user=${user}`, { headers });
  }

}
