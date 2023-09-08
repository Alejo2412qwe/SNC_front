import { Persona } from "./persona.component";
import { Rol } from "./rol.component";


export class Usuario {
  usuId: number;
  usuNombreUsuario: string;
  usuContrasena: string;
  usuEstado: number;
  usuFechaRegistro: Date;
  usuPerId: Persona;
  rolId: Rol;

  constructor(
    usuId?: number,
    usuNombreUsuario?: string,
    usuContrasena?: string,
    usuEstado?: number,
    usuFechaRegistro?: Date,
    usuPerId?: Persona,
    rolId?: Rol
  ) {
    this.usuId = usuId || 0;
    this.usuNombreUsuario = usuNombreUsuario || '';
    this.usuContrasena = usuContrasena || '';
    this.usuEstado = usuEstado || 0;
    this.usuFechaRegistro = usuFechaRegistro || new Date();
    this.usuPerId = usuPerId || new Persona();
    this.rolId = rolId || new Rol();
  }
}
