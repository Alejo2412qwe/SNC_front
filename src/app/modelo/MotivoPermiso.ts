export class MotivoPermiso {
  motId: number;
  motNombre: string;
  motEstado: number;
  motDescripcionLarga: string;
  motDescripcionCorta: string;

  constructor(motId?: number, motNombre?: string, motEstado?: number, motDescripcionLarga?: string, motDescripcionCorta?: string) {
    (this.motId = motId || 0),
      (this.motDescripcionLarga = motDescripcionLarga || ''),
      (this.motDescripcionCorta = motDescripcionCorta || ''),
      (this.motNombre = motNombre || ''),
      (this.motEstado = motEstado || 0);
  }
}
