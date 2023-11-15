export class TipoInstitucion {
  tipId: number;
  tipNombre: string;
  tipEstado: number;

  constructor(tipId?: number, tipNombre?: string, tipEstado?: number) {
    (this.tipId = tipId || 0),
      (this.tipNombre = tipNombre || ''),
      (this.tipEstado = tipEstado || 0);
  }
}
