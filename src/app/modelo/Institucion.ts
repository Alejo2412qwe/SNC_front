import { TipoInstitucion } from './tipoInstitucion';

export class Institucion {
  instId: number;
  instNombre: string;
  instDireccion: string;
  instEstado: number;
  instCodigo: string;
  instReferencia: string;
  tipId: TipoInstitucion;

  constructor(
    instId?: number,
    instNombre?: string,
    instDireccion?: string,
    instEstado?: number,
    instCodigo?: string,
    instReferencia?: string,
    tipId?: TipoInstitucion
  ) {
    (this.instId = instId || 0),
      (this.instNombre = instNombre || ''),
      (this.instDireccion = instDireccion || ''),
      (this.instCodigo = instCodigo || ''),
      (this.instReferencia = instReferencia || ''),
      (this.instEstado = instEstado || 0),
      (this.tipId = tipId || new TipoInstitucion());
  }
}
