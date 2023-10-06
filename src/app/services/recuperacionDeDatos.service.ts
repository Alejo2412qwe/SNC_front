import { Observable } from 'rxjs';
import { entorno } from '../enviroment/entorno';
import { HttpClient } from '@angular/common/http';

export class recuperacionDeDatos {
  constructor(private http: HttpClient) {}

  public sendEmailRecoverPassword(email: string): Observable<String> {
    return this.http.get<String>(
      entorno.urlPublica + '/email/sendRecuperacionPassword/' + email
    );
  }
}
