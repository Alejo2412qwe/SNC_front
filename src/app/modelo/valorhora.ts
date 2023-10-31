export class ValorHora {
  valorId: number;
  valorHora: number;
  valorFecha: Date;
  valorEstado: number;

  constructor(
    valorId?: number,
    valorHora?: number,
    valorFecha?: Date,
    valorEstado?: number
  ) {
    (this.valorId = valorId || 0),
      (this.valorHora = valorHora || 0),
      (this.valorFecha = valorFecha || new Date()),
      (this.valorEstado = valorEstado || 0);
  }
}
