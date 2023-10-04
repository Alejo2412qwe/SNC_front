import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/entorno';
import { Procesos } from '../modelo/procesos';

export class ProcesosService {
  constructor(private http: HttpClient) {}

  public saveProcesos(Procesos: Procesos): Observable<Procesos> {
    return this.http.post<Procesos>(
      environment.apiuri + '/Procesos/create',
      Procesos
    );
  }
}
