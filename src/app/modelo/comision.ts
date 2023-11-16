export class Comision {
    comId: number;
    comDetalle?: string;
    comDesdeFecha?: Date;
    comHastaFecha?: Date;
    comDias?: number;
    comLugar?: string;
    comInforme?: string;

    constructor(
        comId?: number,
        comDetalle?: string,
        comDesdeFecha?: Date,
        comHastaFecha?: Date,
        comDias?: number,
        comLugar?: string,
        comInforme?: string,
    ) {
        this.comId = comId || 0;
        this.comDetalle = comDetalle || '';
        this.comDesdeFecha = comDesdeFecha || new Date();
        this.comHastaFecha = comHastaFecha || new Date();
        this.comDias = comDias || 0;
        this.comLugar = comLugar || '';
        this.comInforme = comInforme || '';
    }
}