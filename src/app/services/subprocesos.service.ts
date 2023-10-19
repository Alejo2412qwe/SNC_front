import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { Subprocesos } from '../modelo/subprocesos';

export class SuprocesosService {
  constructor(private http: HttpClient) {}

  public saveSubprocesos(subprocesos: Subprocesos): Observable<Subprocesos> {
    return this.http.post<Subprocesos>(
      entorno.urlPublica + '/subprocesos/create',
      subprocesos
    );
  }
}
