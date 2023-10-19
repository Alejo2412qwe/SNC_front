export class EstadoAsistencia {
  estId?: number;
  estNombre?: string;
  estEstado?: boolean;

  constructor(estId?: number, estNombre?: string, estEstado?: boolean) {
    (this.estId = estId || 0),
      (this.estNombre = estNombre || ''),
      (this.estEstado = estEstado || false);
  }
}
