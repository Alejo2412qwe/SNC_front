import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { entorno } from '../enviroment/entorno';
import { TipoFormulario } from '../modelo/tipoformulario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoFormularioService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/tipoformulario`;

  saveTipoFormulario(
    TipoFormulario: TipoFormulario
  ): Observable<TipoFormulario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<TipoFormulario>(
      `${this.url}/create`,
      TipoFormulario,
      {
        headers,
      }
    );
  }

  getAllTipoFormulario() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<TipoFormulario[]>(`${this.url}/read`, { headers });
  }

  getTipoFormularioByEstado(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<TipoFormulario[]>(
      `${this.url}/getTipoFormularioByEstado?est=${est}`,
      { headers }
    );
  }

  updateTipoFormulario(
    TipoFormulario: TipoFormulario,
    id: number
  ): Observable<TipoFormulario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.put<TipoFormulario>(
      `${this.url}/update/${id}`,
      TipoFormulario,
      {
        headers,
      }
    );
  }

  updateEst(id: number, est: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<void>(
      `${this.url}/updateEst?id=${id}&est=${est}`,
      null,
      { headers }
    );
  }
}
