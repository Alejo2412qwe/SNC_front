import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionStorageService } from "./session-storage.service";
import { entorno } from "../enviroment/entorno";
import { Zonales } from "../modelo/zonales";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ZonalService {

    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService
    ) { }

    private url: string = `${entorno.urlPrivada}/zonales`;


    saveZonal(Zonales: Zonales): Observable<Zonales> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        return this.http.post<Zonales>(`${this.url}/create`, Zonales, {
            headers,
        });
    }

    searchZonales(search: string, est: number) {
        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Zonales[]>(
            `${this.url}/searchZonales?search=${search}&est=${est}`,
            { headers }
        );
    }

    getZonalesByEstado(est: number) {
        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Zonales[]>(
            `${this.url}/getZonalesByEstado?est=${est}`,
            { headers }
        );
    }

    updateZonal(Zonales: Zonales, id: number): Observable<Zonales> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        return this.http.put<Zonales>(`${this.url}/update/${id}`, Zonales, {
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

    getZonalById(id: number): Observable<Zonales> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
        });

        return this.http.get<Zonales>(`${this.url}/getZonalById?id=${id}`, {
            headers,
        });
    }

}