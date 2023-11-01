import { Institucion } from "./Institucion";
import { Funciones } from "./funciones";
import { Persona } from "./persona";
import { Procesos } from "./procesos";
import { Rol } from "./rol";

export class Usuario {
  usuId: number;
  usuNombreUsuario: string;
  usuContrasena: string;
  usuCorreo: string;
  usuEstado: number;
  usuFechaRegistro: Date;
  usuPerId: Persona;
  rolId: Rol;
  insId: Institucion;
  procId: Procesos;
  funId: Funciones;
  foto: string; // Campo para la imagen
  titulo: string;


  constructor(
    usuId?: number,
    usuNombreUsuario?: string,
    usuContrasena?: string,
    usuEstado?: number,
    usuFechaRegistro?: Date,
    usuPerId?: Persona,
    rolId?: Rol,
    usuCorreo?: string,
    insId?: Institucion,
    procId?: Procesos,
    funId?: Funciones,
    foto?: string, // Agregar el campo foto al constructor
    titulo?: string
  ) {
    this.usuId = usuId || 0;
    this.usuNombreUsuario = usuNombreUsuario || '';
    this.usuContrasena = usuContrasena || '';
    this.usuEstado = usuEstado || 0;
    this.usuFechaRegistro = usuFechaRegistro || new Date();
    this.usuPerId = usuPerId || new Persona();
    this.rolId = rolId || new Rol();
    this.usuCorreo = usuCorreo || '';
    this.insId = insId || new Institucion();
    this.procId = procId || new Procesos();
    this.funId = funId || new Funciones();
    this.foto = foto || ''; // Asignar el valor pasado o null si no se proporciona
    this.titulo = titulo || '';
  }
}


// export class Usuario {
//   usuId: number;
//   usuNombreUsuario: string;
//   usuContrasena: string;
//   usuCorreo: string;
//   usuEstado: number;
//   usuFechaRegistro: Date;
//   usuPerId: Persona;
//   rolId: Rol;
//   insId: Institucion;
//   procId: Procesos;
//   funId: Funciones;

//   constructor(
//     usuId?: number,
//     usuNombreUsuario?: string,
//     usuContrasena?: string,
//     usuEstado?: number,
//     usuFechaRegistro?: Date,
//     usuPerId?: Persona,
//     rolId?: Rol,
//     usuCorreo?: string,
//     insId?: Institucion,
//     procId?: Procesos,
//     funId?: Funciones,
//   ) {
//     this.usuId = usuId || 0;
//     this.usuNombreUsuario = usuNombreUsuario || '';
//     this.usuContrasena = usuContrasena || '';
//     this.usuEstado = usuEstado || 0;
//     this.usuFechaRegistro = usuFechaRegistro || new Date();
//     this.usuPerId = usuPerId || new Persona();
//     this.rolId = rolId || new Rol();
//     this.usuCorreo = usuCorreo || '';
//     this.insId = new Institucion();
//     this.procId = new Procesos();
//     this.funId = new Funciones();
//   }
// }
