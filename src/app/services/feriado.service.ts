import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { entorno } from "../enviroment/entorno";
import { SessionStorageService } from "./session-storage.service";
import { Feriados } from "../modelo/feriados";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class FeriadoService {

    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService
    ) { }

    private url: string = `${entorno.urlPrivada}/feriados`;

    saveFeriados(feriados: Feriados): Observable<Feriados> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        return this.http.post<Feriados>(`${this.url}/create`, feriados, {
            headers,
        });
    }

    getFeriadosByEstado(est: number) {
        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Feriados[]>(
            `${this.url}/getFeriadosByEstado?est=${est}`,
            { headers }
        );
    }

    updateFeriados(feriados: Feriados, id: number): Observable<Feriados> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        return this.http.put<Feriados>(`${this.url}/update/${id}`, feriados, {
            headers,
        });
    }

    updateEst(id: number, est: number): Observable<void> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.put<void>(
            `${this.url}/updateEst?id=${id}&est=${est}`,
            null,
            { headers }
        );
    }

    getFeriadosById(id: number): Observable<Feriados> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
        });

        return this.http.get<Feriados>(`${this.url}/getFeriadosById?id=${id}`, {
            headers,
        });
    }
}