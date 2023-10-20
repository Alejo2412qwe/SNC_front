import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { Subprocesos } from '../modelo/subprocesos';
import { SessionStorageService } from './session-storage.service';

export class SuprocesosService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  public saveSubprocesos(subprocesos: Subprocesos): Observable<Subprocesos> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.post<Subprocesos>(
      entorno.urlPublica + '/subprocesos/create',
      subprocesos,
      { headers }
    );
  }
}
