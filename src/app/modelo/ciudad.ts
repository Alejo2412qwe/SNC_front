import { Provincia } from "./provincia";

export class Ciudad {
    ciuId?: number;
    ciuNombre?: string;
    proId?: Provincia;


    constructor(
        ciuId?: number,
        ciuNombre?: string,
        proId?: Provincia,

    ) {
        this.ciuId = ciuId;
        this.ciuNombre = ciuNombre;
        this.proId = proId || new Provincia();

    }
}
