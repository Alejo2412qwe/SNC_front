export class Vacaciones {
    vacId: number;
    vacDetalle?: string;
    vacSaldo?: number;
    vacDiasAnticipacion?: number;
    vacDiasCaducados?: number;
    vacTotalDiasDisponibles?: number;
    vacDiasUsados?: number;
    vacDiasGanados?: number;
    vacDiasComision?: number;
    vacFecha?: Date;

    constructor(
        vacId?: number,
        vacDetalle?: string,
        vacFechaRegistro?: Date,
        vacSaldo?: number,
        vacDiasAnticipacion?: number,
        vacDiasCaducados?: number,
        vacTotalDiasDisponibles?: number,
        vacDiasUsados?: number,
        vacDiasGanados?: number,
        vacDiasComision?: number
    ) {
        this.vacId = vacId || 0;
        this.vacDetalle = vacDetalle || '';
        this.vacFecha = vacFechaRegistro || new Date();
        this.vacSaldo = vacSaldo || 0;
        this.vacDiasAnticipacion = vacDiasAnticipacion || 0;
        this.vacDiasCaducados = vacDiasCaducados || 0;
        this.vacTotalDiasDisponibles = vacTotalDiasDisponibles || 0;
        this.vacDiasUsados = vacDiasUsados || 0;
        this.vacDiasGanados = vacDiasGanados || 0;
        this.vacDiasComision = vacDiasComision || 0;
    }
}