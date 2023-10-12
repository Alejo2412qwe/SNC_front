import { EstadoAsistencia } from './estadoasistencia';
import { Subprocesos } from './subprocesos';
import { Usuario } from './usuario.component';

export class Asistencia {
  asisId?: number;
  asisNombre?: string;
  asisVerificacion?: string;
  asisEstado?: boolean;
  asisLector?: number;
  asisFecha?: string;
  asisHoraMarcado?: string;
  subId?: Subprocesos;
  usuId?: Usuario;
  estadoAsistencia?: EstadoAsistencia;

  constructor(
    asisId?: number,
    asisNombre?: string,
    asisVerificacion?: string,
    asisEstado?: boolean,
    asisLector?: number,
    asisFecha?: string,
    asisHoraMarcado?: string,
    subId?: Subprocesos,
    usuId?: Usuario,
    estadoAsistencia?: EstadoAsistencia
  ) {
    (this.asisId = asisId || 0),
      (this.asisNombre = asisNombre || ''),
      (this.asisVerificacion = asisVerificacion || '');
    (this.asisEstado = asisEstado || false),
      (this.asisLector = asisLector || 0),
      (this.asisFecha = asisFecha = ''),
      (this.asisHoraMarcado = asisHoraMarcado || ''),
      (this.subId = subId || new Subprocesos()),
      (this.usuId = usuId || new Usuario()),
      (this.estadoAsistencia = estadoAsistencia || new EstadoAsistencia());
  }
}
