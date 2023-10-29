import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Procesos } from 'src/app/modelo/procesos';
import { Subprocesos } from 'src/app/modelo/subprocesos';
import { ProcesosService } from 'src/app/services/procesos.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SubprocesosService } from 'src/app/services/subprocesos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaprocesos-subprocesos',
  templateUrl: './listaprocesos-subprocesos.component.html',
  styleUrls: ['./listaprocesos-subprocesos.component.css'],
})
export class ListaprocesosSubprocesosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private subprocesosService: SubprocesosService,
    private procesoService: ProcesosService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarSubprocesos();
    this.loadProcesosByEstado(this.estadoActivo);
    this.loadSubprocesosByProcEstado(this.estadoActivo, this.estadoActivo);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  subproceso: Subprocesos = new Subprocesos();
  proceso: Procesos = new Procesos();
  procesoSelected: any;

  //VARIABLES
  newProceso: string = '';
  newSubproceso: string = '';
  estadoActivo: number = 1;

  //LISTAS
  listaProcesos: Procesos[] = [];
  listaSubprocesos: Subprocesos[] = [];

  cargarSubprocesos() {
    this.subprocesosService.getAllSubProcesos().subscribe((data) => {
      this.listaSubprocesos = data;
    });
  }
  /*inicio del proceso*/
  saveProceso() {
    this.procesoService.saveProcesos(this.proceso).subscribe((data) => {
      this.loadProcesosByEstado(this.estadoActivo);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: data.procNombre + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  openCrearProceso() {
    Swal.fire({
      title: 'Crear Nuevo Proceso',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newProceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.proceso.procNombre = this.newProceso;
        this.saveProceso();
        this.loadProcesosByEstado(this.estadoActivo);
      },
    });
  }

  updateProceso(id: number) {
    this.procesoService.updateProcesos(this.proceso, id).subscribe((data) => {
      this.loadProcesosByEstado(this.estadoActivo);
      this.loadSubprocesosByProcEstado(1, 1);
      Swal.fire({
        title: 'Edición Exitosa!',
        text: data.procNombre + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  updateEstProceso(id: number, est: number) {
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
        this.procesoService.updateEst(id, est).subscribe({
          next: () => {
            this.loadProcesosByEstado(this.estadoActivo);
            this.loadSubprocesosByProcEstado(1, 1);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {},
        });
      } else if (result.isDenied) {
        this.loadProcesosByEstado(this.estadoActivo);
        this.loadSubprocesosByProcEstado(
          this.estadoActivo,
          this.subproceso.subEstado
        );
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  openUpdateProceso(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newProceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.proceso.procNombre = this.newProceso;
        this.updateProceso(id);
        this.loadProcesosByEstado(this.estadoActivo);
        this.loadSubprocesosByProcEstado(
          this.estadoActivo,
          this.subproceso.subEstado
        );
      },
    });
  }

  loadProcesosByEstado(est: number) {
    this.procesoService.getProcesosByEstado(est).subscribe((response) => {
      this.listaProcesos = response; // Asigna los datos al array provincias
    });
  }
  /*fin del proceso*/

  /*inicio del subproceso*/
  saveSubproceso() {
    this.subprocesosService
      .saveSubprocesos(this.subproceso)
      .subscribe((data) => {
        this.cargarSubprocesos();
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.subNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearSubproceso(procId: number) {
    this.cargarSubprocesos();
    Swal.fire({
      title: 'Crear Nuevo Subproceso',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Subproceso o Departamento" [(ngModel)]="subproceso.subNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newSubproceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.subproceso.procId.procId = procId;
        this.subproceso.subNombre = this.newSubproceso;
        this.saveSubproceso();
      },
    });
  }

  openUpdateSubproceso(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Subproceso o Departamento" [(ngModel)]="subproceso.subNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newSubproceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.subproceso.subNombre = this.newSubproceso;
        this.updateSubproceso(id);
        this.loadProcesosByEstado(this.estadoActivo);
        this.loadSubprocesosByProcEstado(
          this.estadoActivo,
          this.subproceso.subEstado
        );
      },
    });
  }

  updateSubproceso(id: number) {
    this.subprocesosService
      .updateSubproceso(this.subproceso, id)
      .subscribe((data) => {
        this.loadSubprocesosByProcEstado(1, 1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.subNombre + ' editado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstSubproceso(id: number, est: number) {
    Swal.fire({
      title: `Está a punto de eliminar el subproceso, ¿desea continuar?`,
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
        this.subprocesosService.updateEst(id, est).subscribe({
          next: () => {
            this.loadSubprocesosByProcEstado(1, 1);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {},
        });
      } else if (result.isDenied) {
        this.loadSubprocesosByProcEstado(1, 1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  loadSubprocesosByProcEstado(estproc: number, estsub: number) {
    this.subprocesosService
      .getSubprocesosByProcEstado(estproc, estsub)
      .subscribe((response) => {
        this.listaSubprocesos = response; // Asigna los datos al array provincias
      });
  }
  /*fin del proceso*/
}
