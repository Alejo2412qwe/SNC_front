import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { Procesos } from '../modelo/procesos';
import { SessionStorageService } from './session-storage.service';

export class ProcesosService {
  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/procesos`;
  
  saveProcesos(Procesos: Procesos): Observable<Procesos> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    return this.http.post<Procesos>(
      entorno.urlPublica + '/Procesos/create',
      Procesos
    );
  }

  getAllProcesos() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.sessionStorage.getItem('token')}` // Agrega el token JWT aquí
    });

    return this.http.get<Procesos[]>(`${this.url}/read`, { headers });
  }
}
