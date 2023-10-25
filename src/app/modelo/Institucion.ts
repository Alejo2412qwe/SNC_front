import { tipoInstitucion } from './tipoInstitucion';

export class Institucion {
  insId: number;
  insNombre: string;
  intDireccion: string;
  tipId: tipoInstitucion;

  constructor(
    insId?: number,
    insNombre?: string,
    intDireccion?: string,
    tipId?: tipoInstitucion
  ) {
    (this.insId = insId || 0),
      (this.insNombre = insNombre || ''),
      (this.intDireccion = intDireccion || ''),
      (this.tipId = tipId || new tipoInstitucion());
  }
}
