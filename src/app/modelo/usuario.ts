import { Institucion } from "./Institucion";
import { Funciones } from "./funciones";
import { Horarios } from "./horario";
import { Persona } from "./persona";
import { Procesos } from "./procesos";
import { Regimen } from "./regimen";
import { Rol } from "./rol";
import { Subprocesos } from "./subprocesos";
import { Zonales } from "./zonales";

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
  subId: Subprocesos;
  funId: Funciones;
  foto: string; // Campo para la imagen
  titulo: string;
  regId: Regimen;
  zonId: Zonales;
  horId: Horarios;
  usuSaldoVacacional: number;
  usuIdLector: number;
  usuIdJefe?: number;


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
    subId?: Subprocesos,
    funId?: Funciones,
    foto?: string, // Agregar el campo foto al constructor
    titulo?: string,
    regId?: Regimen,
    zonId?: Zonales,
    horId?: Horarios,
    usuSaldoVacacional?: number,
    usuIdLector?: number,
    usuIdJefe?: number
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
    this.subId = subId || new Subprocesos();
    this.funId = funId || new Funciones();
    this.regId = regId || new Regimen();
    this.zonId = zonId || new Zonales();
    this.horId = horId || new Horarios();
    this.foto = foto || ''; // Asignar el valor pasado o null si no se proporciona
    this.titulo = titulo || '';
    this.usuSaldoVacacional = usuSaldoVacacional || 0;
    this.usuIdLector = usuIdLector || 0;
    this.usuIdJefe = usuIdJefe || 0;

  }
}

