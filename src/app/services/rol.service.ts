import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService
import { entorno } from '../enviroment/entorno';
import { Rol } from '../modelo/rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPublica}/rol`
  private token = this.sessionStorage.getItem('token');


  getAllRoles() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    return this.http.get<Rol[]>(`${this.url}/read`, { headers });

  }

}
