import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { entorno } from '../enviroment/entorno';
import { SessionStorageService } from './session-storage.service';
import { Regimen } from '../modelo/regimen';

@Injectable({
  providedIn: 'root',
})
export class RegimenService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/regimen`;

  getAllRegimen() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    // alert("GESTION= " + this.sessionStorage.getItem('token'))

    return this.http.get<Regimen[]>(`${this.url}/read`, { headers });
  }
}
