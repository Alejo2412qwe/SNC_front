export class Rol {
  rolId: number;
  rolNombre: string;
  rolDescripcion: string;
  rolFechaRegistro: Date;

  constructor(rolId?: number, rolNombre?: string, rolDescripcion?: string, rolFechaRegistro?: Date) {
    this.rolId = rolId || 0;
    this.rolNombre = rolNombre || '';
    this.rolDescripcion = rolDescripcion || '';
    this.rolFechaRegistro = rolFechaRegistro || new Date();
  }
}
