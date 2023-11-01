import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MotivoPermiso } from 'src/app/modelo/MotivoPermiso';
import { Permisos } from 'src/app/modelo/permisos';
import { Provincia } from 'src/app/modelo/provincia';
import { Regimen } from 'src/app/modelo/regimen';
import { TipoFormulario } from 'src/app/modelo/tipoformulario';
import { TipoPermiso } from 'src/app/modelo/tipopermiso';
import { Usuario } from 'src/app/modelo/usuario';
import { MotivoPermisoService } from 'src/app/services/motivopermiso.service';
import { PermisoService } from 'src/app/services/permiso.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { RegimenService } from 'src/app/services/regimen.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { TipoFormularioService } from 'src/app/services/tipoformulario.service';
import { TipoPermisoService } from 'src/app/services/tipopermiso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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
    private usuarioService: UsuarioService,
    private provinciaService: ProvinciaService,
    private motivoService: MotivoPermisoService,
    private tipopermisoService: TipoPermisoService,
    private permisoService: PermisoService,
    private tipoformularioService: TipoFormularioService
  ) { }

  ngOnInit(): void {
    this.cargarRegimen();
    this.cargarProvincias();
    this.cargarMotivos();
    this.cargarTipoPermiso();
    this.cargarTipoFormulario();
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');
  idUsuario = this.sessionStorage.getItem('userId');

  regimen: Regimen = new Regimen();
  usuario: Usuario = new Usuario();
  permiso: Permisos = new Permisos();
  provincia: Provincia = new Provincia();
  tipopermiso: TipoPermiso = new TipoPermiso();
  tipoformulario: TipoFormulario = new TipoFormulario();
  motivopermiso: MotivoPermiso = new MotivoPermiso();

  cedula: string = '';

  listaregiemen: Regimen[] = [];
  listausuario: Usuario[] = [];
  listProvincias: Provincia[] = [];
  listamotivos: MotivoPermiso[] = [];
  listatipopermisos: TipoPermiso[] = [];
  listatipoformulario: TipoFormulario[] = [];


  cargarRegimen() {
    this.regimenService.getAllRegimen().subscribe((data) => {
      this.listaregiemen = data;
    });
  }

  cargarTipoFormulario() {
    this.tipoformularioService.getAllTipoFormulario().subscribe((data) => {
      this.listatipoformulario = data;
    });
  }

  cargarProvincias() {
    this.provinciaService.getAllProvincias().subscribe((response) => {
      this.listProvincias = response; // Asigna los datos al array provincias
    });
  }

  cargarMotivos() {
    this.motivoService.getAllMotivoPermiso().subscribe((data) => {
      this.listamotivos = data
    })
  }

  cargarTipoPermiso() {
    this.tipopermisoService.getAllTiposPermiso().subscribe((data) => {
      this.listatipopermisos = data;
    })
  }

}
