import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService
import { Provincia } from '../modelo/provincia';
import { entorno } from '../enviroment/entorno';


@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPrivada}/provincias`
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  // private token = this.sessionStorage.getItem('token');


  // Método para hacer una solicitud HTTP protegida con JWT
  getAllProvincias() {

    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Provincia[]>(`${this.url}/read`, { headers });

  }

}
