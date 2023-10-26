import { TipoInstitucion } from './tipoInstitucion';

export class Institucion {
  instId: number;
  instNombre: string;
  instDireccion: string;
  tipId: TipoInstitucion;

  constructor(
    instId?: number,
    instNombre?: string,
    instDireccion?: string,
    tipId?: TipoInstitucion
  ) {
    (this.instId = instId || 0),
      (this.instNombre = instNombre || ''),
      (this.instDireccion = instDireccion || ''),
      (this.tipId = tipId || new TipoInstitucion());
  }
}
