import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Permisos } from 'src/app/modelo/permisos';
import { Regimen } from 'src/app/modelo/regimen';
import { RegimenService } from 'src/app/services/regimen.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-listamispermisos',
  templateUrl: './listamispermisos.component.html',
  styleUrls: ['./listamispermisos.component.css'],
})
export class ListamispermisosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  permisos: Permisos = new Permisos();

  //VARIABLES
  newFunciones: string = '';
  estadoActivo: number = 1;

  //LISTAS
  listapermisos: Permisos[] = [];
}
