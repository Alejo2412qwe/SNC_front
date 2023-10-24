export class Procesos {
  procId: number;
  procNombre: string;

  constructor(procId?: number, procNombre?: string) {
    (this.procId = procId || 0), (this.procNombre = procNombre || '');
  }
}
