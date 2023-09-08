export class Rol {
  rolId?: number;
  rolNombre?: string;
  rolFechaRegistro?: Date;

  constructor(rolId?: number, rolNombre?: string, rolFechaRegistro?: Date) {
    this.rolId = rolId || 0;
    this.rolNombre = rolNombre || '';
    this.rolFechaRegistro = rolFechaRegistro || new Date();
  }
}
