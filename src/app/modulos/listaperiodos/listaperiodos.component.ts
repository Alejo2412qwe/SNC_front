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
    private toastr: ToastrService,

  ) { }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  periodos: Periodos = new Periodos();
  periodosSelected: any;
  currentDate: Date = new Date(); //Va actuaizando la fecha dia con dia
  //VARIABLES
  newPeriodos: string = '';
  newPeriodos2: string = '';
  diasAnticipacion: number = 0;
  searchString: string = '';

  //LISTAS
  listaPeriodos: Periodos[] = [];

  ngOnInit(): void {
    this.cargarPeriodos();
    this.loadPeriodosByEstado(1);
  }

  calcularAnticipacionDias(fechaActual: Date, fechaAnterior: Date): number {
    const diff = Math.abs(fechaAnterior.getTime() - fechaActual.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }

  searchPeriodos(search: string, est: number) {
    this.periodosService.searchPeriodos(search, est).subscribe((response) => {
      this.listaPeriodos = response;
    });
  }

  cargarPeriodos() {
    this.periodosService.getAllPeriodos().subscribe((data) => {
      this.listaPeriodos = data;
    });
  }

  saveProceso() {
    this.periodosService.savePeriodos(this.periodos).subscribe((data) => {
      this.loadPeriodosByEstado(1);
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
      html: `
      <label for="swal-input2">Período Anterior:</label>
      <input id="swal-input2" class="swal2-input" placeholder="Período Anterior" [(ngModel)]="newPeriodos2" type="date" >
      `,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newPeriodos2 = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;

        if (this.validarFecha(this.newPeriodos2)) {
          this.periodos.periActual = new Date(this.currentDate.toISOString().split('T')[0]); // Convierte la cadena a Date
          this.periodos.periAnterior = new Date(this.newPeriodos2); // Convierte la cadena a Date
          this.periodos.diasAnticipacion = this.calcularAnticipacionDias(this.periodos.periActual, this.periodos.periAnterior);
          this.saveProceso();
          this.loadPeriodosByEstado(1);
        } else {
          Swal.showValidationMessage('No se puede crear el periodo.');
        }
      },
    });
  }

  validarFecha(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

  updatePeriodos(id: number) {
    this.periodosService
      .updatePeriodos(this.periodos, id)
      .subscribe((data) => {
        this.loadPeriodosByEstado(1);
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
            this.loadPeriodosByEstado(1);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => { },
        });
      } else if (result.isDenied) {
        this.loadPeriodosByEstado(1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }
  openUpdatePeriodos(periAnterior: Date, id: number) {
    const vistaPer = new Date(periAnterior);
    const dia = vistaPer.getDate();
    const mes = vistaPer.getMonth() + 1;
    const anio = vistaPer.getFullYear();

    const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${anio}`;

    Swal.fire({
      title: 'Editar ' + fechaFormateada,
      html: `
      <label for="swal-input2">Período Anterior:</label>
      <input id="swal-input2" class="swal2-input" placeholder="Período Anterior" [(ngModel)]="newPeriodos2" type="date">
      `,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newPeriodos = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (this.validarFecha(this.newPeriodos) && this.validarFecha(this.newPeriodos2)) {
          this.periodos.periActual = new Date(this.newPeriodos); // Convierte la cadena a Date
          this.periodos.periAnterior = new Date(this.newPeriodos2); // Convierte la cadena a Date
          this.updatePeriodos(id);
          this.loadPeriodosByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }
}