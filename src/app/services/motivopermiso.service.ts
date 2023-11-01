import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { entorno } from '../enviroment/entorno';
import { MotivoPermiso } from '../modelo/MotivoPermiso';
import { SessionStorageService } from './session-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MotivoPermisoService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/motivopermiso`;

  saveMotivo(MotivoPermiso: MotivoPermiso): Observable<MotivoPermiso> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<MotivoPermiso>(`${this.url}/create`, MotivoPermiso, {
      headers,
    });
  }

  getAllMotivoPermiso() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<MotivoPermiso[]>(`${this.url}/read`, { headers });
  }

  getMotivosByEstado(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<MotivoPermiso[]>(
      `${this.url}/getMotivosByEstado?est=${est}`,
      { headers }
    );
  }

  updateMotivo(
    MotivoPermiso: MotivoPermiso,
    id: number
  ): Observable<MotivoPermiso> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.put<MotivoPermiso>(
      `${this.url}/update/${id}`,
      MotivoPermiso,
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
