import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { Comision } from '../modelo/comision';
import { SessionStorageService } from './session-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class ComisionService {
  
    constructor(private http: HttpClient, private sessionStorage: SessionStorageService) { }
  
    private url: string = `${entorno.urlPrivada}/comision`
    private token = this.sessionStorage.getItem('token');
  
  
    getComision() {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
      });

      return this.http.get<Comision[]>(this.url + '/read', { headers });
    }
  
    agregarComision(comision: Comision): Observable<Comision> {
  
      // Construir el encabezado de autorización con el token JWT
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
      });
  
      // Realiza la solicitud HTTP con el encabezado de autorización
      return this.http.post<Comision>(`${this.url}/create`, comision, { headers });
  
    }
  
    actualizarComision(id: number, comision: Comision): Observable<Comision> {
  
      // Construir el encabezado de autorización con el token JWT
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
      });
  
      // Realiza la solicitud HTTP con el encabezado de autorización
  
      return this.http.put<Comision>(`${this.url}/update/${id}`, comision, {headers});
  
    }
  
    eliminarComision(id: number) {
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
      });
  
      return this.http.delete(`${this.url}/delete/${id}`);
    }
  
    buscarComision(fecha: string): Observable<Comision[]> {
      // Construir el encabezado de autorización con el token JWT
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
      });
    
      // Puedes ajustar los parámetros según tu API
      const params = new HttpParams().set('fecha', fecha);
    
      // Realiza la solicitud HTTP con el encabezado de autorización
      return this.http.get<Comision[]>(`${this.url}/buscarComision`, { headers, params });
    }
  
  }
  