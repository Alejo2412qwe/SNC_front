import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Institucion } from 'src/app/modelo/Institucion';
import { MotivoPermiso } from 'src/app/modelo/MotivoPermiso';
import { Permisos } from 'src/app/modelo/permisos';
import { Procesos } from 'src/app/modelo/procesos';
import { Provincia } from 'src/app/modelo/provincia';
import { Subprocesos } from 'src/app/modelo/subprocesos';
import { TipoInstitucion } from 'src/app/modelo/tipoInstitucion';
import { TipoFormulario } from 'src/app/modelo/tipoformulario';
import { TipoPermiso } from 'src/app/modelo/tipopermiso';
import { Usuario } from 'src/app/modelo/usuario';
import { Vacaciones } from 'src/app/modelo/vacaciones';
import { InstitucionService } from 'src/app/services/institucion.service';
import { MotivoPermisoService } from 'src/app/services/motivopermiso.service';
import { PermisoService } from 'src/app/services/permiso.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SubprocesosService } from 'src/app/services/subprocesos.service';
import { tipoInstitucionService } from 'src/app/services/tipoInstitucion.service';
import { TipoFormularioService } from 'src/app/services/tipoformulario.service';
import { TipoPermisoService } from 'src/app/services/tipopermiso.service';
import { VacacionesService } from 'src/app/services/vacaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private provinciaService: ProvinciaService,
    private motivoService: MotivoPermisoService,
    private tipopermisoService: TipoPermisoService,
    private permisoService: PermisoService,
    private tipoformularioService: TipoFormularioService,
    private institucionService: InstitucionService,
    private tipInstitucionService: tipoInstitucionService,
    private subprocesosService: SubprocesosService,
    private procesoService: ProcesosService,
    private vacacionesService: VacacionesService
  ) { }

  ngOnInit(): void {
    this.cargarProvincias();
    this.cargarMotivos();
    this.cargarTipoPermiso();
    this.cargarTipoFormulario();
    this.cargarInstitucionesByEstado(1);
    this.loadTipoInstitucionByEstado(1);
    this.cargarSubprocesos(1, 1);
    this.loadProcesosByEstado(1);
    this.loadSubprocesosByProcEstado(1, 1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');


  usuario: Usuario = new Usuario();
  permiso: Permisos = new Permisos();
  provincia: Provincia = new Provincia();
  tipopermiso: TipoPermiso = new TipoPermiso();
  tipoformulario: TipoFormulario = new TipoFormulario();
  motivopermiso: MotivoPermiso = new MotivoPermiso();
  vacaciones: Vacaciones = new Vacaciones();
  fechaPermiso = new Date();

  cedula: string = '';

  //LISTAS
  listausuario: Usuario[] = [];
  listProvincias: Provincia[] = [];
  listamotivos: MotivoPermiso[] = [];
  listatipopermisos: TipoPermiso[] = [];
  listatipoformulario: TipoFormulario[] = [];

  //LISTAS
  listaInstituciones: Institucion[] = [];
  listaTipoInstituciones: TipoInstitucion[] = [];
  listaProcesos: Procesos[] = [];
  listaSubprocesos: Subprocesos[] = [];


  cargarSubprocesos(estProc: number, estSub: number) {
    this.subprocesosService.getSubprocesosByProcEstado(estProc, estSub).subscribe((data) => {
      this.listaSubprocesos = data;
    });
  }

  loadProcesosByEstado(est: number) {
    this.procesoService.getProcesosByEstado(est).subscribe((response) => {
      this.listaProcesos = response; // Asigna los datos al array provincias
    });
  }

  loadSubprocesosByProcEstado(estproc: number, estsub: number) {
    this.subprocesosService
      .getSubprocesosByProcEstado(estproc, estsub)
      .subscribe((response) => {
        this.listaSubprocesos = response; // Asigna los datos al array provincias
      });
  }

  cargarTipoFormulario() {
    this.tipoformularioService.getAllTipoFormulario().subscribe((data) => {
      this.listatipoformulario = data;
    });
  }

  loadTipoInstitucionByEstado(est: number) {
    this.tipInstitucionService
      .getTipoInstitucionByEstado(est)
      .subscribe((response) => {
        this.listaTipoInstituciones = response; // Asigna los datos al array provincias
      });
  }

  cargarInstitucionesByEstado(est: number) {
    this.institucionService.getInstitucionesByEstado(est).subscribe((data) => {
      this.listaInstituciones = data;
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

  calcularResultadoMultiplicado() {
    const resultadoDiferenciaDias = this.calcularDiferenciaDias();
    const resultadoMultiplicado = resultadoDiferenciaDias * 1.36363636363636;
    return resultadoMultiplicado;
  }


  calcularDiferenciaDias() {
    const fechaInicio = new Date(this.permiso.permFechaInicio);
    const fechaFin = new Date(this.permiso.permFechaFin);

    let diferenciaDias = 0;
    let currentDate = new Date(fechaInicio); // Inicializa con una copia de la fecha de inicio

    while (currentDate <= fechaFin) {
      const dayOfWeek = currentDate.getDay();

      // Si el día no es sábado (6) ni domingo (0), incrementa la diferencia
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        diferenciaDias++;
      }

      currentDate.setDate(currentDate.getDate() + 1); // Avanza al siguiente día
    }

    return diferenciaDias;
  }

  calcularDiferenciaHoras() {
    const horaInicio = new Date('1970-01-01 ' + this.permiso.permHorasInicio);
    const horaFin = new Date('1970-01-01 ' + this.permiso.permHorasFin);

    // Calculamos la diferencia en milisegundos
    const diferenciaMilisegundos = horaFin.getTime() - horaInicio.getTime();

    // Convertimos la diferencia a horas
    const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));

    return diferenciaHoras;
  }

  validarFecha() {
    const fechaActual = new Date().toISOString().split('T')[0];
    return fechaActual;
  }


  savePermiso() {
    this.permiso.usuId.usuId = this.sessionStorage.getItem('userId') || 0;
    this.vacaciones.usuId.usuId = this.permiso.usuId.usuId;
    if (this.rol === 'Jefe de Unidad') {
      this.permiso.permEstado = 2;
    } else {
      this.permiso.permEstado = 3;
    }
    this.permisoService.savePermiso(this.permiso).subscribe((data) => {
      if (this.permiso.motId.motId == 7) {
        this.fechaPermiso = new Date(this.permiso.permFechaInicio);
        this.vacaciones.vacFecha = this.fechaPermiso;
        this.vacaciones.vacDetalle = this.permiso.permObservacion;
        this.vacaciones.vacDias = this.calcularDiferenciaDias();
        this.vacaciones.vacHoras = this.calcularDiferenciaHoras();
        this.vacacionesService.agregarVacaciones(this.permiso.usuId.usuId, this.vacaciones).subscribe((response) => {
        })
        Swal.fire({
          title: 'Permiso N°' + data.permId + ' Generado de manera exitosa!',
          text: 'Recuerde descargar su archivo desde sus permisos',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setTimeout(() => {
              location.reload();
            }, 400);
          }
        });
      } else {
        Swal.fire({
          title: 'Permiso N°' + data.permId + ' Generado de manera exitosa!',
          text: 'Recuerde descargar su archivo desde sus permisos',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setTimeout(() => {
              location.reload();
            }, 400);
          }
        });
      }
    });
  }
}
