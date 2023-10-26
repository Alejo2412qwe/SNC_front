import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Institucion } from 'src/app/modelo/Institucion';
import { Ciudad } from 'src/app/modelo/ciudad';
import { Persona } from 'src/app/modelo/persona';
import { Procesos } from 'src/app/modelo/procesos';
import { Provincia } from 'src/app/modelo/provincia';
import { Rol } from 'src/app/modelo/rol';
import { Subprocesos } from 'src/app/modelo/subprocesos';
import { TipoInstitucion } from 'src/app/modelo/tipoInstitucion';
import { Usuario } from 'src/app/modelo/usuario';
import { CiudadService } from 'src/app/services/ciudad.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { RolService } from 'src/app/services/rol.service';
import { SuprocesosService } from 'src/app/services/subprocesos.service';
import { tipoInstitucionService } from 'src/app/services/tipoInstitucion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
          text: data.insNombre + ' agregado correctamente',
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
        this.institucion.insNombre = this.newInstitucion;
        this.institucion.intDireccion = this.newInstDireccion;
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
