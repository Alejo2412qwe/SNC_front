import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseUrl = 'URL_DEL_BACKEND'; // Reemplaza por la URL de tu backend

  constructor(private http: HttpClient) { }

  getHorarios() {
    return this.http.get(this.baseUrl + '/horarios');
  }

  agregarHorario(horario: any) {
    return this.http.post(this.baseUrl + '/horarios', horario);
  }

  actualizarHorario(id: number, horario: any) {
    return this.http.put(this.baseUrl + `/horarios/${id}`, horario);
  }

  eliminarHorario(id: number) {
    return this.http.delete(this.baseUrl + `/horarios/${id}`);
  }
}
