export class TipoFormulario {
  tiFoId: number;
  tiFoNombre: string;
  tiFoEstado: number;

  constructor(tiFoId?: number, tiFoNombre?: string, tiFoEstado?: number) {
    (this.tiFoId = tiFoId || 0),
      (this.tiFoNombre = tiFoNombre || ''),
      (this.tiFoEstado = tiFoEstado || 0);
  }
}
