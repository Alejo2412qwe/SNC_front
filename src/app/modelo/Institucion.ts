import { TipoInstitucion } from './tipoInstitucion';

export class Institucion {
  instId: number;
  instNombre: string;
  instDireccion: string;
  instEstado: number;
  tipId: TipoInstitucion;

  constructor(
    instId?: number,
    instNombre?: string,
    instDireccion?: string,
    instEstado?: number,
    tipId?: TipoInstitucion
  ) {
    (this.instId = instId || 0),
      (this.instNombre = instNombre || ''),
      (this.instDireccion = instDireccion || ''),
      (this.instEstado = instEstado || 0),
      (this.tipId = tipId || new TipoInstitucion());
  }
}
