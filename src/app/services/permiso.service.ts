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

    private url: string = `${entorno.urlPrivada}/permisos`;

    savePermiso(Permisos: Permisos): Observable<Permisos> {
        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        return this.http.post<Permisos>(`${this.url}/create`, Permisos, {
            headers,
        });
    }

    searchPermisos(search: string, est: number) {
        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Permisos[]>(
            `${this.url}/searchPermisos?search=${search}`,
            { headers }
        );
    }

    getPermisosByUsuId(id: number) {
        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Permisos[]>(
            `${this.url}/getPermisosByUsuId?id=${id}`,
            { headers }
        );
    }

    getPermisoById(id: number) {
        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Permisos>(
            `${this.url}/getPermisoById?id=${id}`,
            { headers }
        );
    }

    getPermisosByIdJefe(id: number) {
        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Permisos[]>(
            `${this.url}/getPermisosByIdJefe?id=${id}`,
            { headers }
        );
    }

    getPermisosForAdmin(est: number) {
        // Construir el encabezado de autorización
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });

        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.get<Permisos[]>(
            `${this.url}/getPermisosForAdmin?est=${est}`,
            { headers }
        );
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

    updatePermiso(id: number, p: string): Observable<any> {

        // Construir el encabezado de autorización con el token JWT
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`,
        });
        
        // Realiza la solicitud HTTP con el encabezado de autorización
        return this.http.put<any>(`${this.url}/update?id=${id}`, p, {
            headers,
        });
    }

}