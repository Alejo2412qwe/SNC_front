import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {



  ngOnInit(): void {
  }

  crearProceso() {
    Swal.fire({
      title: 'Crear Nuevo Proceso',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    });
  }

  crearSubproceso() {
    Swal.fire({
      title: 'Crear Nuevo Subproceso',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Subproceso o Departamento">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    });
  }

  crearInstituto() {
    Swal.fire({
      title: 'Crear Nuevo Instituto',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Instituto">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    });
  }

  
  crearRol() {
    Swal.fire({
      title: 'Crear Nuevo Rol',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Rol">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    });
  }
}
