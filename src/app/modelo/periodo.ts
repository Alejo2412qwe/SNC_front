export class Periodo{
    periId?: number;
    periActual?: string;
    periAnterior?: string;
    
    constructor(periId?: number, periActual?: string, periAnterior?: string) {
        this.periId = periId || 0;
        this.periActual = periActual || '';
        this.periAnterior = periAnterior || '';
    }
}