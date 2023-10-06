import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { Procesos } from '../modelo/procesos';

export class ProcesosService {
  constructor(private http: HttpClient) {}

  public saveProcesos(Procesos: Procesos): Observable<Procesos> {
    return this.http.post<Procesos>(
      entorno.urlPublica + '/Procesos/create',
      Procesos
    );
  }
}
