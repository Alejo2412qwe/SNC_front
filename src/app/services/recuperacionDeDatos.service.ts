import { Observable } from 'rxjs';
import { environment } from '../enviroment/entorno';
import { HttpClient } from '@angular/common/http';

export class recuperacionDeDatos {
  constructor(private http: HttpClient) {}

  public sendEmailRecoverPassword(email: string): Observable<String> {
    return this.http.get<String>(
      environment.apiuriPublic + '/email/sendRecuperacionPassword/' + email
    );
  }
}
