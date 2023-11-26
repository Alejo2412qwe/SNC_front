import { Ciudad } from "./ciudad";

export class Persona {
  perId: number;
  perCedula: string;
  perNombre: string;
  perApellido: string;
  perDireccion: string;
  perTelefono: string;
  perFechaNacimiento: Date;
  ciuId: Ciudad;

  constructor(
    perId?: number,
    perCedula?: string,
    perNombre?: string,
    perApellido?: string,
    perDireccion?: string,
    perTelefono?: string,
    perFechaNacimiento?: Date,
    ciuId?: Ciudad,
  ) {
    this.perId = perId || 0;
    this.perCedula = perCedula || '';
    this.perNombre = perNombre || '';
    this.perApellido = perApellido || '';
    this.perDireccion = perDireccion || '';
    this.perTelefono = perTelefono || '';
    this.perFechaNacimiento = perFechaNacimiento || new Date();
    this.ciuId = ciuId || new Ciudad(0, 'Seleccione una Ciudad')
  }
}
