import { HttpClient } from '@angular/common/http';
import { EstadoAsistencia } from '../modelo/estadoasistencia';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/entorno';

export class EstadoAsistenciaService {
  constructor(private http: HttpClient) {}

  public saveEstadoAsistencia(
    estadoasistencia: EstadoAsistencia
  ): Observable<EstadoAsistencia> {
    return this.http.post<EstadoAsistencia>(
      environment.apiuri + '/estadoasistencia/create',
      estadoasistencia
    );
  }
}
