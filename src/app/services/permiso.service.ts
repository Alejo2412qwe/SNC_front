import { Injectable } from "@angular/core";
import { Permisos } from "../modelo/permisos";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SessionStorageService } from "./session-storage.service";
import { entorno } from "../enviroment/entorno";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class PermisoService {
    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService
    ) { }

    private url: string = `${entorno.urlPrivada}/tipopermiso`;

    savePermiso(Permisos: Permisos): Observable<Permisos> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        return this.http.post<Permisos>(`${this.url}/create`, Permisos, {
            headers,
        });
    }
}