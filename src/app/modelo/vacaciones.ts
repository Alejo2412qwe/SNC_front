import { Periodos } from "./Periodos";
import { Usuario } from "./usuario";

export class Vacaciones {
    vacId: number;
    vacDetalle: string;
    vacDias: number;
    vacHoras: number;
    vacMinutos: number;
    vacSaldo: number;
    vacDiasGanados: number;
    vacNoGozadas: number;
    vacTotalenDias: number;
    vacFecha: Date;
    vacFechaHoy: Date;
    vacEstado: number;

    vacDiasAnticipacion?: number;
    vacDiasCaducados?: number;
    vacTotalDiasDisponibles?: number;
    vacDiasUsados?: number;
    periId: Periodos;
    usuId: Usuario;

    constructor(
        vacId?: number,
        vacDetalle?: string,
        vacDias?: number,
        vacHoras?: number,
        vacMinutos?: number,
        vacSaldo?: number,
        vacDiasGanados?: number,
        vacNoGozadas?: number,
        vacTotalenDias?: number,
        vacFecha?: Date,
        vacFechaHoy?: Date,
        vacEstado?: number,
        vacDiasAnticipacion?: number,
        vacDiasCaducados?: number,
        vacTotalDiasDisponibles?: number,
        vacDiasUsados?: number,
        periId?: Periodos,
        usuId?: Usuario
    ) {
        this.vacId = vacId || 0;
        this.vacDetalle = vacDetalle || '';
        this.vacDias = vacDias || 0;
        this.vacHoras = vacHoras || 0;
        this.vacMinutos = vacMinutos || 0;
        this.vacSaldo = vacSaldo || 0;
        this.vacDiasGanados = vacDiasGanados || 0;
        this.vacNoGozadas = vacNoGozadas || 0;
        this.vacTotalenDias = vacTotalenDias || 0;
        this.vacFecha = vacFecha || new Date();
        this.vacFechaHoy = vacFechaHoy || new Date();
        this.vacEstado = vacEstado || 0;
        this.vacDiasAnticipacion = vacDiasAnticipacion || 0;
        this.vacDiasCaducados = vacDiasCaducados || 0;
        this.vacTotalDiasDisponibles = vacTotalDiasDisponibles || 0;
        this.vacDiasUsados = vacDiasUsados || 0;
        this.periId = periId || new Periodos();
        this.usuId = usuId || new Usuario();
    }
}