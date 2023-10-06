import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { Asistencia } from '../modelo/asistencia';

export class AsistenciaService {
  constructor(private http: HttpClient) {}

  public saveAsistencia(asistencia: Asistencia): Observable<Asistencia> {
    return this.http.post<Asistencia>(
      entorno.urlPublica + '/asistencia/create',
      asistencia
    );
  }
  
}
