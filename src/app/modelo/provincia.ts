export class Provincia {
  proId: number;
  proNombre: string;



  constructor(
    proId?: number,
    proNombre?: string,


  ) {
    this.proId = proId || 0;
    this.proNombre = proNombre || 'Seleccione una Provincia';


  }
}
