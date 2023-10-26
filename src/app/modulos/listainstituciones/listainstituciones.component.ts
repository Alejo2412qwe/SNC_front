import { Component, OnInit } from '@angular/core';
import { Institucion } from 'src/app/modelo/Institucion';
import { TipoInstitucion } from 'src/app/modelo/tipoInstitucion';
import { InstitucionService } from 'src/app/services/institucion.service';
import { tipoInstitucionService } from 'src/app/services/tipoInstitucion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listainstituciones',
  templateUrl: './listainstituciones.component.html',
  styleUrls: ['./listainstituciones.component.css'],
})
export class ListainstitucionesComponent implements OnInit {
  constructor(
    private institucionService: InstitucionService,
    private tipInstitucionService: tipoInstitucionService
  ) {}

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
    this.cargarTipoInstituciones();
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
        this.institucion.tipId.tipId = tipId;
        this.institucion.instNombre = this.newInstitucion;
        this.institucion.instDireccion = this.newInstDireccion;
        this.saveInstitucion();
      },
    });
  }

  saveTipoInstitucion() {
    this.tipInstitucionService
      .saveTipoInstitucion(this.tipInstitucion)
      .subscribe((data) => {
        this.cargarTipoInstituciones();
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
    this.cargarTipoInstituciones();
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
        this.tipInstitucion.tipNombre = this.newTipoinstitucion;
        this.saveTipoInstitucion();
      },
    });
  }
}
