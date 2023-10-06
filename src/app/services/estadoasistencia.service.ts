import { HttpClient } from '@angular/common/http';
import { EstadoAsistencia } from '../modelo/estadoasistencia';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';

export class EstadoAsistenciaService {
  constructor(private http: HttpClient) {}

  public saveEstadoAsistencia(
    estadoasistencia: EstadoAsistencia
  ): Observable<EstadoAsistencia> {
    return this.http.post<EstadoAsistencia>(
      entorno.urlPublica + '/estadoasistencia/create',
      estadoasistencia
    );
  }
}
