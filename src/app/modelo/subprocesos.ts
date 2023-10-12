import { Procesos } from './procesos';

export class Subprocesos {
  subId?: number;
  subNombre?: string;
  procId?: Procesos;

  constructor(subId?: number, subNombre?: string, procId?: Procesos) {
    (this.subId = subId || 0),
      (this.subNombre = subNombre || ''),
      (this.procId = procId || new Procesos());
  }
}
