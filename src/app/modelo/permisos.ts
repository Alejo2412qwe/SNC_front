import { MotivoPermiso } from './MotivoPermiso';
import { Regimen } from './regimen';
import { TipoFormulario } from './tipoformulario';
import { TipoPermiso } from './tipopermiso';
import { Usuario } from './usuario';

export class Permisos {
  permId: number;
  permFechaEmision: Date;
  permObservacion: string;
  permFechaInicio: string;
  permFechaFin: string;
  permEstado: number;
  permHorasInicio: string;
  permHorasFin: string;
  permDocumento: string
  tiPeId: TipoPermiso;
  usuId: Usuario;
  tiFoId: TipoFormulario;
  motId: MotivoPermiso;

  constructor(
    permId?: number,
    permObservacion?: string,
    permFechaEmision?: Date,
    permFechaInicio?: string,
    permFechaFin?: string,
    permHorasInicio?: string,
    permHorasFin?: string,
    permEstado?: number,
    permDocumento?: string,
    tiPeId?: TipoPermiso,
    usuId?: Usuario,
    tiFoId?: TipoFormulario,
    motId?: MotivoPermiso,
  ) {
    this.permFechaEmision = permFechaEmision || new Date();
    this.permId = permId || 0;
    this.permObservacion = permObservacion || '';
    this.permFechaInicio = permFechaInicio || '';
    this.permFechaFin = permFechaFin || '';
    this.permHorasInicio = permHorasInicio || '';
    this.permHorasFin = permHorasFin || '';
    this.permEstado = permEstado || 0;
    this.permDocumento = permDocumento || '';
    this.tiPeId = tiPeId || new TipoPermiso();
    this.usuId = usuId || new Usuario();
    this.tiFoId = tiFoId || new TipoFormulario();
    this.motId = motId || new MotivoPermiso();
  }
}
