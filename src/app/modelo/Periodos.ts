export class Periodos {
    periId: number;
    periActual: Date;
    periAnterior: Date;
    diasAnticipacion: number;
    periEstado:number;
    
  
    constructor(periId?: number, periActual?: Date, periAnterior?: Date,diasAnticipacion?: number, periEstado?:number) {
      (this.periId = periId || 0),
        (this.periActual = periActual || new Date() ),
        (this.periAnterior = periAnterior || new Date()),
        (this.diasAnticipacion = diasAnticipacion || 0),
        (this.periEstado = periEstado || 0);
    }
  }