import { Component, OnInit } from '@angular/core';
import { Institucion } from 'src/app/modelo/Institucion';
import { Ciudad } from 'src/app/modelo/ciudad';
import { Persona } from 'src/app/modelo/persona';
import { Procesos } from 'src/app/modelo/procesos';
import { Provincia } from 'src/app/modelo/provincia';
import { Rol } from 'src/app/modelo/rol';
import { Subprocesos } from 'src/app/modelo/subprocesos';
import { Usuario } from 'src/app/modelo/usuario';
import { ProcesosService } from 'src/app/services/procesos.service';
import { SuprocesosService } from 'src/app/services/subprocesos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaprocesos-subprocesos',
  templateUrl: './listaprocesos-subprocesos.component.html',
  styleUrls: ['./listaprocesos-subprocesos.component.css'],
})
export class ListaprocesosSubprocesosComponent implements OnInit {
  constructor(
    private subprocesosService: SuprocesosService,
    private procesoService: ProcesosService
  ) {}

  ngOnInit(): void {
    this.cargarProcesos();
    this.cargarSubprocesos();
  }

  //OBJETOS
  subproceso: Subprocesos = new Subprocesos();
  proceso: Procesos = new Procesos();
  procesoSelected: any;

  //VARIABLES
  newProceso: string = '';
  newSubproceso: string = '';

  //LISTAS
  listaProcesos: Procesos[] = [];
  listaSubprocesos: Subprocesos[] = [];

  cargarProcesos() {
    this.procesoService.getAllProcesos().subscribe((data) => {
      this.listaProcesos = data;
    });
  }

  cargarSubprocesos() {
    this.subprocesosService.getAllSubProcesos().subscribe((data) => {
      this.listaSubprocesos = data;
    });
  }

  saveProceso() {
    this.procesoService.saveProcesos(this.proceso).subscribe((data) => {
      this.cargarProcesos();
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
        this.cargarProcesos();
      },
    });
  }

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
    // Aquí puedes usar 'procId' para crear el subproceso
    this.cargarSubprocesos();
    Swal.fire({
      title: 'Crear Nuevo Subproceso',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Subproceso o Departamento">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newSubproceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        // Aquí puedes usar 'procId' y 'newSubproceso' para crear el subproceso
        this.subproceso.procId.procId = procId; // Asigna el 'procId' al subproceso
        this.subproceso.subNombre = this.newSubproceso;
        this.saveSubproceso();
      },
    });
  }
}
