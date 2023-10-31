export class MotivoPermiso {
  motId: number;
  motNombre: string;
  motEstado: number;

  constructor(motId?: number, motNombre?: string, motEstado?: number) {
    (this.motId = motId || 0),
      (this.motNombre = motNombre || ''),
      (this.motEstado = motEstado || 0);
  }
}
