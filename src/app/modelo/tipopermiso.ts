export class TipoPermiso {
  tiPeId: number;
  tiPeNombre: string;
  tiPeEstado: number;
  tiPeDescripcion: string;

  constructor(
    tiPeId?: number,
    tiPeNombre?: string,
    tiPeEstado?: number,
    tiPeDescripcion?: string
  ) {
    (this.tiPeId = tiPeId || 0),
      (this.tiPeNombre = tiPeNombre || ''),
      (this.tiPeDescripcion = tiPeDescripcion || ''),
      (this.tiPeEstado = tiPeEstado || 0);
  }
}
