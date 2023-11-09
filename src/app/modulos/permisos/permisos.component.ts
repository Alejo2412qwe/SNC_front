import { Component, OnInit } from '@angular/core';
import { MotivoPermiso } from 'src/app/modelo/MotivoPermiso';
import { Permisos } from 'src/app/modelo/permisos';
import { Provincia } from 'src/app/modelo/provincia';
import { TipoFormulario } from 'src/app/modelo/tipoformulario';
import { TipoPermiso } from 'src/app/modelo/tipopermiso';
import { Usuario } from 'src/app/modelo/usuario';
import { MotivoPermisoService } from 'src/app/services/motivopermiso.service';
import { PermisoService } from 'src/app/services/permiso.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { TipoFormularioService } from 'src/app/services/tipoformulario.service';
import { TipoPermisoService } from 'src/app/services/tipopermiso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
})
export class PermisosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private provinciaService: ProvinciaService,
    private motivoService: MotivoPermisoService,
    private tipopermisoService: TipoPermisoService,
    private permisoService: PermisoService,
    private tipoformularioService: TipoFormularioService
  ) { }

  ngOnInit(): void {
    this.cargarProvincias();
    this.cargarMotivos();
    this.cargarTipoPermiso();
    this.cargarTipoFormulario();
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');


  usuario: Usuario = new Usuario();
  permiso: Permisos = new Permisos();
  provincia: Provincia = new Provincia();
  tipopermiso: TipoPermiso = new TipoPermiso();
  tipoformulario: TipoFormulario = new TipoFormulario();
  motivopermiso: MotivoPermiso = new MotivoPermiso();

  cedula: string = '';


  listausuario: Usuario[] = [];
  listProvincias: Provincia[] = [];
  listamotivos: MotivoPermiso[] = [];
  listatipopermisos: TipoPermiso[] = [];
  listatipoformulario: TipoFormulario[] = [];

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


  savePermiso() {
    this.permiso.usuId.usuId = this.sessionStorage.getItem('userId') || 0;
    this.permisoService.savePermiso(this.permiso).subscribe((data) => {
      Swal.fire({
        title: 'Permiso N°'+data.permId + ' Generado de manera exitosa!',
        text: 'Recuerde descargar su archivo desde sus permisos',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }
}
