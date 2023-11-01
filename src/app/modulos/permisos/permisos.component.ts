import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Permisos } from 'src/app/modelo/permisos';
import { Regimen } from 'src/app/modelo/regimen';
import { Usuario } from 'src/app/modelo/usuario';
import { RegimenService } from 'src/app/services/regimen.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
})
export class PermisosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
    private regimenService: RegimenService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarRegimen();
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');
  idUsuario = this.sessionStorage.getItem('id');

  regimen: Regimen = new Regimen();
  dataUsuario: Usuario = new Usuario();
  permiso:Permisos = new Permisos();

  cedula:string = '';

  listaregiemen: Regimen[] = [];

  cargarRegimen() {
    this.regimenService.getAllRegimen().subscribe((data) => {
      this.listaregiemen = data;
    });
  }

}
