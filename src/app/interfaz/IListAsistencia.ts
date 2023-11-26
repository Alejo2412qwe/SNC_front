import { Asistencia } from "../modelo/asistencia";
import { Usuario } from "../modelo/usuario";

export interface IListAsistencia {
    asisId?: Asistencia;
    userId?: Usuario;
}