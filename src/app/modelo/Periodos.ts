export class Periodos {
    periId: number;
    periActual: string;
    periAnterior: string;
    periEstado:number;
    
  
    constructor(periId?: number, periActual?: string, periAnterior?: string, periEstado?:number) {
      (this.periId = periId || 0),
        (this.periActual = periActual || ''),
        (this.periAnterior = periAnterior || ''),
        (this.periEstado = periEstado || 0);
    }
  }