import { MotivoPermiso } from './MotivoPermiso';
import { Regimen } from './regimen';
import { TipoFormulario } from './tipoformulario';
import { TipoPermiso } from './tipopermiso';
import { Usuario } from './usuario';

export class Permisos {
  permId: number;
  permObservacion: string;
  permFechaInicio: Date;
  permFechaFin: Date;
  permEstado: number;
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
    permFechaInicio?: Date,
    permFechaFin?: Date,
    permHorasInicio?: Date,
    permHorasFin?: Date,
    permEstado?: number,
    tiPeId?: TipoPermiso,
    usuId?: Usuario,
    tiFoId?: TipoFormulario,
    motId?: MotivoPermiso,
    regId?: Regimen
  ) {
    this.permId = permId || 0;
    this.permObservacion = permObservacion || '';
    this.permFechaInicio = permFechaInicio || new Date();
    this.permFechaFin = permFechaFin || new Date(); 
    this.permHorasInicio = permHorasInicio || new Date(); 
    this.permHorasFin = permHorasFin || new Date(); 
    this.permEstado = permEstado || 0;
    this.tiPeId = tiPeId || new TipoPermiso();
    this.usuId = usuId || new Usuario();
    this.tiFoId = tiFoId || new TipoFormulario();
    this.motId = motId || new MotivoPermiso();
    this.regId = regId || new Regimen();
  }
}