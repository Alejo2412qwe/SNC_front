export class Feriados {
    ferId: number;
    ferFechaInicio: string;
    ferFechaFin: string;
    ferEstado: number;

    constructor(ferId?: number, ferFechaInicio?: string, ferFechaFin?: string, ferEstado?: number) {
        (this.ferId = ferId || 0),
            (this.ferFechaInicio = ferFechaInicio || ''),
            (this.ferFechaFin = ferFechaFin || ''),
            (this.ferEstado = ferEstado || 0);
    }
}