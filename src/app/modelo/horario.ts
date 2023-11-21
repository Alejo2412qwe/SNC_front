export class Horarios {
  horId: number;
  horNumHoras: number;
  horHoraIngresoDia: string;
  horHoraSalidaDia: string;
  horHoraIngresoTarde: string;
  horHoraSalidaTarde: string;
  horEstado: number;
  horHorasParaAlmuerzo:number;

  constructor(
    horId?: number,
    horNumHoras?: number,
    horHoraIngresoDia?: string,
    horHoraSalidaDia?: string,
    horHoraIngresoTarde?: string,
    horHoraSalidaTarde?: string,
    horEstado?: number,
    horHorasParaAlmuerzo?:number
  ) {
    this.horId = horId || 0;
    this.horNumHoras = horNumHoras || 0;
    this.horHoraIngresoDia = horHoraIngresoDia || '';
    this.horHoraSalidaDia = horHoraSalidaDia || '';
    this.horHoraIngresoTarde = horHoraIngresoTarde || '';
    this.horHoraSalidaTarde = horHoraSalidaTarde || '';
    this.horEstado = horEstado || 0;
    this.horHorasParaAlmuerzo = horHorasParaAlmuerzo || 0;
  }
}
