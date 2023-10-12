import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }


  // Método para guardar datos en sessionStorage
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Método para obtener datos de sessionStorage
  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Método para eliminar un elemento de sessionStorage
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Método para eliminar todos los elementos de sessionStorage
  clear(): void {
    sessionStorage.clear();
  }
}
