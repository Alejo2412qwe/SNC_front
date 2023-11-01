export class Funciones {
    funId: number;
    funNombre: string;
    funEstado:number;
    
  
    constructor(funId?: number, funNombre?: string,funEstado?:number) {
      (this.funId = funId || 0),
        (this.funNombre = funNombre || ''),
        (this.funEstado = funEstado || 0);
        
    }
  }