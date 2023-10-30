import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Institucion } from 'src/app/modelo/Institucion';
import { TipoInstitucion } from 'src/app/modelo/tipoInstitucion';
import { InstitucionService } from 'src/app/services/institucion.service';
import { tipoInstitucionService } from 'src/app/services/tipoInstitucion.service';
import Swal from 'sweetalert2';
import { validarCadena } from 'src/app/common/validaciones';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-listainstituciones',
  templateUrl: './listainstituciones.component.html',
  styleUrls: ['./listainstituciones.component.css'],
})
export class ListainstitucionesComponent implements OnInit {
  constructor(
    //services
    private institucionService: InstitucionService,
    private tipInstitucionService: tipoInstitucionService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService
  ) {}

  //usuario de la sesion actual
  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  institucion: Institucion = new Institucion();
  tipInstitucion: TipoInstitucion = new TipoInstitucion();

  //VARIABLES
  newInstitucion: string = '';
  newInstDireccion: string = '';
  newTipoinstitucion: string = '';

  //LISTAS
  listaInstituciones: Institucion[] = [];
  listaTipoInstituciones: TipoInstitucion[] = [];

  ngOnInit(): void {
    this.cargarInstituciones();
    this.loadTipoInstitucionByEstado(1);
  }

  cargarInstituciones() {
    this.institucionService.getAllInstituciones().subscribe((data) => {
      this.listaInstituciones = data;
    });
  }

  cargarTipoInstituciones() {
    this.tipInstitucionService.getAllTipoInstituciones().subscribe((data) => {
      this.listaTipoInstituciones = data;
    });
  }

  showErrorAlCrear() {
    Swal.fire({
      icon: 'error',
      title: 'No se puede crear',
      text: 'No se puede crear el elemento en este momento.',
    });
  }

  /*inicio de Institucion*/
  saveInstitucion() {
    this.institucionService
      .saveInstitucion(this.institucion)
      .subscribe((data) => {
        this.cargarInstituciones();
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.instNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearInstitucion(tipId: number) {
    this.cargarInstituciones();
    Swal.fire({
      title: 'Crear Nueva Institucion',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Institución" [(ngModel)]="institucion.insNombre"><input id="swal-input2" class="swal2-input" placeholder="Dirección" [(ngModel)]="institucion.intDireccion">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newInstitucion = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.newInstDireccion = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        if (
          validarCadena(this.newInstitucion) &&
          validarCadena(this.newInstDireccion)
        ) {
          this.institucion.tipId.tipId = tipId;
          this.institucion.instNombre = this.newInstitucion;
          this.institucion.instDireccion = this.newInstDireccion;
          this.saveInstitucion();
        } else {
          this.showErrorAlCrear();
        }
      },
    });
  }

  openUpdateInstitucion(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Institución" [(ngModel)]="institucion.insNombre"><input id="swal-input2" class="swal2-input" placeholder="Dirección" [(ngModel)]="institucion.intDireccion">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newInstitucion = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.newInstDireccion = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        if (
          validarCadena(this.newInstitucion) &&
          validarCadena(this.newInstDireccion)
        ) {
          this.institucion.instNombre = this.newInstitucion;
          this.institucion.instDireccion = this.newInstDireccion;
          this.updateInstitucion(id);
          this.loadInstitucionesByTipId(1, this.institucion.instEstado);
        } else {
          this.showErrorAlCrear();
        }
      },
    });
  }

  updateInstitucion(id: number) {
    this.institucionService
      .updateInstitucion(this.institucion, id)
      .subscribe((data) => {
        this.loadInstitucionesByTipId(1, 1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.instNombre + ' editado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstInstitucion(id: number, est: number) {
    Swal.fire({
      title: `Está a punto de eliminar la institucion, ¿desea continuar?`,
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
        this.institucionService.updateEst(id, est).subscribe({
          next: () => {
            this.loadInstitucionesByTipId(1, 1);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {},
        });
      } else if (result.isDenied) {
        this.loadInstitucionesByTipId(1, 1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  loadInstitucionesByTipId(tipid: number, instid: number) {
    this.institucionService
      .getInstitucionesByTipId(tipid, instid)
      .subscribe((response) => {
        this.listaInstituciones = response; // Asigna los datos al array provincias
      });
  }
  /*fin de Institucion*/

  /*Inicio de Tipo de Institucion*/
  saveTipoInstitucion() {
    this.tipInstitucionService
      .saveTipoInstitucion(this.tipInstitucion)
      .subscribe((data) => {
        this.loadTipoInstitucionByEstado(1);
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.tipNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearTipoInstitucion() {
    Swal.fire({
      title: 'Crear Nueva Institucion',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Tipo de Institución" [(ngModel)]="tipInstitucion.tipNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newTipoinstitucion = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newTipoinstitucion)) {
          this.tipInstitucion.tipNombre = this.newTipoinstitucion;
          this.saveTipoInstitucion();
          this.loadTipoInstitucionByEstado(1);
        } else {
          this.showErrorAlCrear();
        }
      },
    });
  }

  openUpdateTipoInstitucion(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Tipo de Institución" [(ngModel)]="tipInstitucion.tipNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newTipoinstitucion = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newTipoinstitucion)) {
          this.tipInstitucion.tipNombre = this.newTipoinstitucion;
          this.updateTipoInstitucion(id);
          this.loadTipoInstitucionByEstado(1);
          this.loadInstitucionesByTipId(1, this.institucion.instEstado);
        } else {
          this.showErrorAlCrear();
        }
      },
    });
  }

  updateTipoInstitucion(id: number) {
    this.tipInstitucionService
      .updateTipoInstitucion(this.tipInstitucion, id)
      .subscribe((data) => {
        this.loadTipoInstitucionByEstado(1);
        this.loadInstitucionesByTipId(1, 1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.tipNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstTipoInstitucion(id: number, est: number) {
    Swal.fire({
      title: `Al eliminar el proceso también deshabilitará los institutos pertenecientes, ¿Està seguro de ello?`,
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
        this.tipInstitucionService.updateEst(id, est).subscribe({
          next: () => {
            this.loadTipoInstitucionByEstado(1);
            this.loadInstitucionesByTipId(1, 1);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {},
        });
      } else if (result.isDenied) {
        this.loadTipoInstitucionByEstado(1);
        this.loadInstitucionesByTipId(1, this.institucion.instEstado);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  loadTipoInstitucionByEstado(est: number) {
    this.tipInstitucionService
      .getTipoInstitucionByEstado(est)
      .subscribe((response) => {
        this.listaTipoInstituciones = response; // Asigna los datos al array provincias
      });
  }
  /*fin de Tipo de Institucion*/
}
