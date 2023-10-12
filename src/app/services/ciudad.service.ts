import { Injectable } from '@angular/core';
import { entorno } from '../enviroment/entorno';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service'; // Importa SessionStorageService
import { Ciudad } from '../modelo/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }

  private url: string = `${entorno.urlPrivada}/ciudad`
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  // private token = this.sessionStorage.getItem('token')

  getCiudadByProv(idProv: number) {

    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Ciudad[]>(`${this.url}/ciudadByProv/${idProv}`, { headers });

  }

}
