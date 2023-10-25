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
    private suprocesosService: SuprocesosService,
    private procesoService: ProcesosService
  ) {}

  ngOnInit(): void {
    this.cargarProcesos();
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
    this.suprocesosService
      .saveSubprocesos(this.subproceso)
      .subscribe((data) => {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.subNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearSubproceso() {
    this.cargarProcesos();
    Swal.fire({
      title: 'Crear Nuevo Subproceso',
      html: '<select id="procesos" name="procesos" class="input2" style="color: #777;" [(ngModel)]="proceso.procId" (change)="procesoSelected = proceso.procId"> <option value="0">Selecciona el proceso</option> <option *ngFor="let proceso of listaProcesos" [value]="proceso.procId"> {{ proceso.procNombre }}</option></select> <input id="swal-input1" class="swal2-input" placeholder="Subproceso o Departamento">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newSubproceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.subproceso.subNombre = this.newSubproceso;
        this.subproceso.procId.procId = this.procesoSelected;
        this.saveSubproceso();
      },
    });
  }
}
