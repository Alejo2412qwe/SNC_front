import { Procesos } from './procesos';

export class Subprocesos {
  subId: number;
  subNombre: string;
  subEstado: number;
  procId: Procesos;

  constructor(
    subId?: number,
    subNombre?: string,
    subEstado?: number,
    procId?: Procesos
  ) {
    (this.subId = subId || 0),
      (this.subNombre = subNombre || ''),
      (this.subEstado = subEstado || 0),
      (this.procId = procId || new Procesos());
  }
}
