export class Zonales {
    zonId: number;
    zonNombre: string;
    zonCodigo: string;
    zonEstado: number;

    constructor(
        zonId?: number,
        zonNombre?: string,
        zonCodigo?: string,
        zonEstado?: number
    ) {
        (this.zonId = zonId || 0),
            (this.zonNombre = zonNombre || ''),
            (this.zonCodigo = zonCodigo || ''),
            (this.zonEstado = zonEstado || 0);
    }
}