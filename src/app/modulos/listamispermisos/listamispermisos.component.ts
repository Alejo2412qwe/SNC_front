import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Permisos } from 'src/app/modelo/permisos';
import { Regimen } from 'src/app/modelo/regimen';
import { PermisoService } from 'src/app/services/permiso.service';
import { RegimenService } from 'src/app/services/regimen.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listamispermisos',
  templateUrl: './listamispermisos.component.html',
  styleUrls: ['./listamispermisos.component.css'],
})
export class ListamispermisosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
    private permisoService: PermisoService,
  ) { }

  ngOnInit(): void {
    this.getPermisosByUsuId(this.sessionStorage.getItem('userId') || 0);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  permisos: Permisos = new Permisos();

  //VARIABLES
  newFunciones: string = '';
  estadoActivo: number = 1;

  //LISTAS
  listapermisos: Permisos[] = [];

  getPermisosByUsuId(id: number) {
    this.permisoService.getPermisosByUsuId(id).subscribe((data) => {
      this.listapermisos = data
    })
  }

  showInfo() {
    Swal.fire({
      title: 'Información De Los Estados',
      html:
        '<ul style="list-style-type: none; padding: 0; margin: 0;">' +
        '  <li id="li1">E: En Espera</li>' +
        '  <li id="li2">A: Aprobado</li>' +
        '  <li id="li3" style="margin-left: 2px;">D: Denegado</li>' +
        '</ul>',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  }
}
