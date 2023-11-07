import { MotivoPermiso } from './MotivoPermiso';
import { Regimen } from './regimen';
import { TipoFormulario } from './tipoformulario';
import { TipoPermiso } from './tipopermiso';
import { Usuario } from './usuario';

export class Permisos {
  permId: number;
  permFechaEmision: Date;
  permObservacion: string;
  permFechaInicio: Date;
  permFechaFin: Date;
  permEstado: string;
  permHorasInicio: Date;
  permHorasFin: Date;
  tiPeId: TipoPermiso;
  usuId: Usuario;
  tiFoId: TipoFormulario;
  motId: MotivoPermiso;
  regId: Regimen;

  constructor(
    permId?: number,
    permObservacion?: string,
    permFechaEmision?: Date,
    permFechaInicio?: Date,
    permFechaFin?: Date,
    permHorasInicio?: Date,
    permHorasFin?: Date,
    permEstado?: string,
    tiPeId?: TipoPermiso,
    usuId?: Usuario,
    tiFoId?: TipoFormulario,
    motId?: MotivoPermiso,
    regId?: Regimen
  ) {
    this.permFechaEmision = permFechaEmision || new Date();
    this.permId = permId || 0;
    this.permObservacion = permObservacion || '';
    this.permFechaInicio = permFechaInicio || new Date();
    this.permFechaFin = permFechaFin || new Date();
    this.permHorasInicio = permHorasInicio || new Date();
    this.permHorasFin = permHorasFin || new Date();
    this.permEstado = permEstado || '';
    this.tiPeId = tiPeId || new TipoPermiso();
    this.usuId = usuId || new Usuario();
    this.tiFoId = tiFoId || new TipoFormulario();
    this.motId = motId || new MotivoPermiso();
    this.regId = regId || new Regimen();
  }
}