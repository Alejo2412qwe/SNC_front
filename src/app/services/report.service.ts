import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { entorno } from "../enviroment/entorno";
import { Regimen } from "../modelo/regimen";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
    providedIn: 'root',
})
export class ReportService {
    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService
    ) { }

    private url: string = `${entorno.urlPrivada}/reporte`;

    getReportePermiso(permId:number) {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.sessionStorage.getItem('token')}`, // Agrega el token JWT aquí
        });
        // alert("GESTION= " + this.sessionStorage.getItem('token'))

        return this.http.get(`${this.url}/generarreporte?permId=${permId}`, {responseType: 'blob', headers });
    }
}