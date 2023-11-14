import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Periodos } from 'src/app/modelo/Periodos';
import { PeriodosService } from 'src/app/services/periodos.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';
import { validarCadena } from 'src/app/common/validaciones';
import { showErrorAlCrear } from 'src/app/common/validaciones';

@Component({
  selector: 'app-listaperiodos',
  templateUrl: './listaperiodos.component.html',
  styleUrls: ['./listaperiodos.component.css'],
})
export class ListaperiodosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private periodosService: PeriodosService,
    private toastr: ToastrService
  ) {}

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  periodos: Periodos = new Periodos();
  periodosSelected: any;

  //VARIABLES
  newPeriodos: string = '';
  estadoActivo: number = 1;

  //LISTAS
  listaPeriodos: Periodos[] = [];

  ngOnInit(): void {
    this.cargarPeriodos();
    this.loadPeriodosByEstado(this.estadoActivo);
  }

  cargarPeriodos() {
    this.periodosService.getAllPeriodos().subscribe((data) => {
      this.listaPeriodos = data;
    });
  }

  saveProceso() {
    this.periodosService.savePeriodos(this.periodos).subscribe((data) => {
      this.loadPeriodosByEstado(this.estadoActivo);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: data.periActual + ' agregado correctamente<br>' + data.periAnterior + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  loadPeriodosByEstado(est: number) {
    this.periodosService.getPeriodosByEstado(est).subscribe((response) => {
      this.listaPeriodos = response; // Asigna los datos al array Periodos
    });
  }

  openCrearPeriodos() {
    Swal.fire({
      title: 'Crear Nuevo Periodo',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newPeriodos = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newPeriodos)) {
          this.periodos.periActual = this.newPeriodos;
          this.periodos.periAnterior = this.newPeriodos;
          this.saveProceso();
          this.loadPeriodosByEstado(this.estadoActivo);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }
  updatePeriodos(id: number) {
    this.periodosService
      .updatePeriodos(this.periodos, id)
      .subscribe((data) => {
        this.loadPeriodosByEstado(this.estadoActivo);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.periActual + ' agregado correctamente<br>' + data.periAnterior + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstPeriodos(id: number, est: number) {
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
        this.periodosService.updateEst(id, est).subscribe({
          next: () => {
            this.loadPeriodosByEstado(this.estadoActivo);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {},
        });
      } else if (result.isDenied) {
        this.loadPeriodosByEstado(this.estadoActivo);
        this.estadoActivo;
        this.toastr.warning('Acción Cancelada');
      }
    });
  }
  openUpdatePeriodos(periActual: string, periAnterior: string, id: number) {
    Swal.fire({
      title: 'Editar ' + periActual + 'Editar ' + periAnterior,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newPeriodos = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newPeriodos)) {
          this.periodos.periActual = this.newPeriodos;
          this.periodos.periAnterior = this.newPeriodos;
          this.updatePeriodos(id);
          this.loadPeriodosByEstado(this.estadoActivo);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }
}