export class tipoInstitucion {
  
  tipId: number;
  tipNombre: string;

  constructor(tipId?: number, tipNombre?: string) {
    (this.tipId = tipId || 0), (this.tipNombre = tipNombre || '');
  }
}
