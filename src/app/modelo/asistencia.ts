import { EstadoAsistencia } from './estadoasistencia';
import { Subprocesos } from './subprocesos';
import { Usuario } from './usuario';

export class Asistencia {
  asisId?: number;
  asisNombre?: string;
  asisDpto?: string;
  asisNoLector?: number;
  asisFechaHora?: Date | string | null;
  asisEstado?: string;
  asisLocacionId?: number;
  asisIdNumero?: number;
  asisCodTrabajo?: number;
  asisVerificaCod?: string;
  asisNoTarjeta?: number;
  asisNombreArchivo: string;
  asisFechaArchivo: Date;
  usuId: Usuario;
  asisEstadoStr: string;


  constructor(
    asisId?: number,
    asisNombre?: string,
    asisDpto?: string,
    asisNoLector?: number,
    asisFechaHora?: Date | string | null,
    asisEstado?: string,
    asisLocacionId?: number,
    asisIdNumero?: number,
    asisCodTrabajo?: number,
    asisVerificaCod?: string,
    asisNoTarjeta?: number,
    asisNombreArchivo?: '',
    asisFechaArchivo?: Date,
    usuId?: Usuario,
    asisEstadoStr?: string,
  ) {
    (this.asisId = asisId || 0),
      (this.asisNombre = asisNombre || ''),
      (this.asisDpto = asisDpto || '');
    (this.asisNoLector = asisNoLector || 0),
      (this.asisFechaHora = asisFechaHora || new Date()),
      (this.asisEstado = asisEstado = ''),
      (this.asisLocacionId = asisLocacionId || 0),
      (this.asisIdNumero = asisIdNumero || 0),
      (this.asisCodTrabajo = asisCodTrabajo || 0),
      (this.asisVerificaCod = asisVerificaCod || '');
    (this.asisNoTarjeta = asisNoTarjeta || 0);
    (this.asisNombreArchivo = asisNombreArchivo || '');
    (this.asisFechaArchivo = asisFechaArchivo || new Date());
    (this.usuId = usuId || new Usuario);
    (this.asisEstadoStr = asisEstadoStr || '')
  }
}
