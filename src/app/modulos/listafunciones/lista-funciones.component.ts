import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Funciones } from 'src/app/modelo/funciones';
import { FuncionesService } from 'src/app/services/funciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-funciones',
  templateUrl: './lista-funciones.component.html',
  styleUrls: ['./lista-funciones.component.css']
})
export class ListaFuncionesComponent implements OnInit {
  constructor(
    private funcionesService: FuncionesService,
    private toastr: ToastrService
  ) {}

  //OBJETOS
  funciones: Funciones = new Funciones();
  funcionesSelected: any;

  //VARIABLES
  newFunciones: string = '';
  estadoActivo: number = 1;
   
  //LISTAS
  listaFunciones: Funciones[] = [];
   
  ngOnInit(): void {
    this.cargarFunciones();
    this.loadFuncionesByEstado(this.estadoActivo);
  }
  
  cargarFunciones() {
    this.funcionesService.getAllFunciones().subscribe((data) => {
      this.listaFunciones = data;
    });
  }

  saveProceso() {
    this.funcionesService.saveFunciones(this.funciones).subscribe((data) => {
      this.loadFuncionesByEstado(this.estadoActivo);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: data.funNombre + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  loadFuncionesByEstado(est: number) {
    this.funcionesService.getFuncionesByEstado(est).subscribe((response) => {
      this.listaFunciones = response; // Asigna los datos al array Funciones
    });
  }
 

  openCrearFuncion() {
    Swal.fire({
      title: 'Crear Nueva Funcion',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newFunciones = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.funciones.funNombre = this.newFunciones;
        this.saveProceso();
        this.loadFuncionesByEstado(this.estadoActivo);
      },
    });
  }
  updateFuncion(id: number) {
    this.funcionesService.updateFunciones(this.funciones, id).subscribe((data) => {
      this.loadFuncionesByEstado(this.estadoActivo);
      Swal.fire({
        title: 'Edición Exitosa!',
        text: data.funNombre + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  
  updateEstFuncion(id: number, est: number) {
    Swal.fire({
      title: `Al eliminar el proceso también deshabilitará los subprocesos pertenecientes, ¿Està seguro de ello?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionesService.updateEst(id, est).subscribe({
          next: () => {
            this.loadFuncionesByEstado(this.estadoActivo);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {},
        });
      } else if (result.isDenied) {
        this.loadFuncionesByEstado(this.estadoActivo);
        (
          this.estadoActivo
      
        );
        this.toastr.warning('Acción Cancelada');
      }
    });
  }
  openUpdateFuncion(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newFunciones = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.funciones.funNombre = this.newFunciones;
        this.updateFuncion(id);
        this.loadFuncionesByEstado(this.estadoActivo);
        
      },
    });
  }

}
