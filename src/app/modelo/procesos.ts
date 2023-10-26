export class Procesos {
  procId: number;
  procNombre: string;
  procEstado: number;

  constructor(procId?: number, procNombre?: string, procEstad?: number) {
    (this.procId = procId || 0),
      (this.procNombre = procNombre || ''),
      (this.procEstado = procEstad || 0);
  }
}
