import { TipoInstitucion } from './tipoInstitucion';

export class Institucion {
  insId: number;
  insNombre: string;
  intDireccion: string;
  tipId: TipoInstitucion;

  constructor(
    insId?: number,
    insNombre?: string,
    intDireccion?: string,
    tipId?: TipoInstitucion
  ) {
    (this.insId = insId || 0),
      (this.insNombre = insNombre || ''),
      (this.intDireccion = intDireccion || ''),
      (this.tipId = tipId || new TipoInstitucion());
  }
}
