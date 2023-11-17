export class Horarios {
  horId: number;
  horNumHoras: string;
  horHoraIngreso: string;
  horHoraSalida: string;
  horHoraAlmuerzoInicio: string;
  horHoraAlmuerzoFin: string;

  constructor(
    horId?: number,
    horNumHoras?: string,
    horHoraIngreso?: string,
    horHoraSalida?: string,
    horHoraAlmuerzoInicio?: string,
    horHoraAlmuerzoFin?: string,
  ) {
    this.horId = horId || 0;
    this.horNumHoras = horNumHoras || '';
    this.horHoraIngreso = horHoraIngreso || '';
    this.horHoraSalida = horHoraSalida || '';
    this.horHoraAlmuerzoInicio = horHoraAlmuerzoInicio || '';
    this.horHoraAlmuerzoFin = horHoraAlmuerzoFin || '';
  }
}
