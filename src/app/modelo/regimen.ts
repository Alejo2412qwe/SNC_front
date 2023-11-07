export class Regimen {
  regId: number;
  regNombre: string;
  regEstado: number;

  constructor(regId?: number, regNombre?: string, regEstado?: number) {
    (this.regId = regId || 0),
      (this.regNombre = regNombre || ''),
      (this.regEstado = regEstado || 0);
  }
}
