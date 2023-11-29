import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  validarCedula,
  calcularEdad,
  validarCorreo,
  validarLetras,
  validarNumeros,
  validarLetrasNum,
} from 'src/app/common/validaciones';
import { UploadEvent } from 'src/app/interfaz/UploadEvent';
import { Institucion } from 'src/app/modelo/Institucion';
import { Ciudad } from 'src/app/modelo/ciudad';
import { Funciones } from 'src/app/modelo/funciones';
import { Persona } from 'src/app/modelo/persona';
import { Procesos } from 'src/app/modelo/procesos';
import { Provincia } from 'src/app/modelo/provincia';
import { Rol } from 'src/app/modelo/rol';
import { Subprocesos } from 'src/app/modelo/subprocesos';
import { TipoInstitucion } from 'src/app/modelo/tipoInstitucion';
import { Usuario } from 'src/app/modelo/usuario';
import { CiudadService } from 'src/app/services/ciudad.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { RolService } from 'src/app/services/rol.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SubprocesosService } from 'src/app/services/subprocesos.service';
import { tipoInstitucionService } from 'src/app/services/tipoInstitucion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { base64ToFile } from '../../common/base64';
import { Regimen } from 'src/app/modelo/regimen';
import { RegimenService } from 'src/app/services/regimen.service';
import { Zonales } from 'src/app/modelo/zonales';
import { ZonalService } from 'src/app/services/zonal.service';
import { Horarios } from 'src/app/modelo/horario';
import { HorarioService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    //SERVICES
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService,
    private personaService: PersonaService,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private subprocesosService: SubprocesosService,
    private procesoService: ProcesosService,
    private institucionService: InstitucionService,
    private tipInstitucionService: tipoInstitucionService,
    private funcionService: FuncionesService,
    private activatedRoute: ActivatedRoute,
    private regimenService: RegimenService,
    private zonalesService: ZonalService,
    private horarioService: HorarioService,
    private sessionStorage: SessionStorageService,
  ) { }

  //OBJETOS
  regimen: Regimen = new Regimen();
  persona: Persona = new Persona();
  usuario: Usuario = new Usuario();
  selectProvincia: Provincia = new Provincia();
  selectProceso: Procesos = new Procesos();
  selectRol: Rol = new Rol();
  proceso: Procesos = new Procesos();
  institucion: Institucion = new Institucion();
  tipInstitucion: TipoInstitucion = new TipoInstitucion();
  tipInstitucionSelected: TipoInstitucion = new TipoInstitucion();
  funcion: Funciones = new Funciones();
  zonal: Zonales = new Zonales();
  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //VARIABLES
  confirmarPass: string = '';
  timeToastr: number = 4000;
  edadMinima = 18;
  newSubproceso: string = '';
  newInstitucion: string = '';
  newProceso: string = '';
  id: number = 0;
  editeMode: boolean = false;
  mostrarJefe: boolean = false;

  //LISTAS
  listProvincias: Provincia[] = [];
  listFunciones: Funciones[] = [];
  listCiudades: Ciudad[] = [];
  listRoles: Rol[] = [];
  listaProcesos: Procesos[] = [];
  listaSubprocesos: Subprocesos[] = [];
  listaInstituciones: Institucion[] = [];
  listaTipoInstitucion: TipoInstitucion[] = [];
  uploadedFiles: File[] = [];
  listaregiemen: Regimen[] = [];
  listaJefes: Usuario[] = [];
  listaZonales: Zonales[] = [];
  listaHorarios: Horarios[] = [];
  // imagenSeleccionada: File | null = null;


  userId: number = 0
  mode: string = ''

  ngOnInit(): void {
    this.cargarRegimen();
    this.cargarRoles();
    this.cargarProvincias();
    this.cargarProcesos();
    this.cargarTipoInstitucion();
    this.cargarFunciones();
    this.cargarJefes(5);
    this.cargarZonales(1);
    this.cargarHorarios();
    this.validateMode();

  }

  toggleMostrarJefe() {
    this.mostrarJefe = !this.mostrarJefe;
  }

  uploadFile(event: UploadEvent) {
    console.log("Upload event triggered");
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      this.uploadedFiles = event.files; // Almacena los archivos seleccionados

      const reader = new FileReader();

      // Configuramos una función de devolución de llamada para cuando la lectura del archivo esté completa
      reader.onload = (e: any) => {
        // e.target.result contiene la representación Base64 del archivo
        const base64String = e.target.result;

        // Almacena el resultado en this.usuario.foto
        this.usuario.titulo = base64String;

      };

      // Leemos el archivo como una URL de datos (Base64)
      reader.readAsDataURL(file);
    }
  }

  onUpload(event: UploadEvent) {
    console.log("Upload event triggered");
    if (event.files && event.files.length > 0) {
      const file = event.files[0];

      const reader = new FileReader();

      // Configuramos una función de devolución de llamada para cuando la lectura del archivo esté completa
      reader.onload = (e: any) => {
        // e.target.result contiene la representación Base64 del archivo
        const base64String = e.target.result;

        // Almacena el resultado en this.usuario.foto
        this.usuario.foto = base64String;
      };

      // Leemos el archivo como una URL de datos (Base64)
      reader.readAsDataURL(file);
    }
  }

  validateMode() {
    this.activatedRoute.params.subscribe((params) => {

      this.mode = params['mode'];

      switch (this.mode) {

        case "edit-user":
          this.userId = params['id'];

          if (this.userId !== undefined) {
            this.editeMode = true;
            this.loadEdit(this.userId);
          }
          break;
        case "edit-profile":
          this.userId = params['id'];

          if (this.userId !== undefined) {
            this.editeMode = true;
            this.loadEdit(this.userId);
          }
          break;
        default:
          console.log("Opción no reconocida");
      }

    });
  }

  loadEdit(idUser: number) {
    this.usuarioService.searchUsersId(idUser).subscribe((response) => {
      this.usuario = response;
      if (response.usuPerId.ciuId?.proId) {
        this.selectProvincia = response.usuPerId.ciuId?.proId;
        this.cargarCiudades();
      }
      this.uploadedFiles.push(base64ToFile(response.foto, response.usuNombreUsuario))
      this.selectProceso.procId = response.subId.procId.procId
      this.tipInstitucionSelected.tipId = response.insId.tipId.tipId;
      this.getSubprocesosByProcesoId();
      this.getInstitucionByTipId();
      this.usuario.usuContrasena = '';
      this.persona = response.usuPerId;
    });
  }

  getInstitucionByTipId() {
    this.listaInstituciones = [];

    if (
      this.tipInstitucionSelected !== undefined &&
      this.tipInstitucionSelected.tipId !== undefined
    ) {
      this.institucionService
        .getInstitucionByTipId(this.tipInstitucionSelected.tipId)
        .subscribe((response) => {
          this.listaInstituciones = response;
        });
    }
  }

  getSubprocesosByProcesoId() {
    this.listaSubprocesos = [];

    if (
      this.selectProceso !== undefined &&
      this.selectProceso.procId !== undefined
    ) {
      const procId = this.selectProceso.procId as number;
      this.subprocesosService
        .getSubprocesosByProcesoId(procId)
        .subscribe((response) => {
          this.listaSubprocesos = response;
        });
    }
  }

  cargarJefes(id: number) {
    this.usuarioService.getJefesByRolId(id).subscribe((data) => {
      this.listaJefes = data;
    })
  }

  cargarHorarios() {
    this.horarioService.getHorariosByEstado(1).subscribe((data) => {
      this.listaHorarios = data;
    });
  }

  cargarRegimen() {
    this.regimenService.getAllRegimen().subscribe((data) => {
      this.listaregiemen = data;
    });
  }

  cargarZonales(est: number) {
    this.zonalesService.getZonalesByEstado(est).subscribe((data) => {
      this.listaZonales = data;
    });
  }

  cargarFunciones() {
    this.funcionService.getAllFunciones().subscribe((data) => {
      this.listFunciones = data;
    });
  }

  cargarTipoInstitucion() {
    this.tipInstitucionService.getAllTipoInstituciones().subscribe((data) => {
      this.listaTipoInstitucion = data;
    });
  }

  cargarProcesos() {
    this.procesoService.getAllProcesos().subscribe((data) => {
      this.listaProcesos = data;
    });
  }

  cargarRoles() {
    this.rolService.getAllRoles().subscribe((response) => {
      this.listRoles = response; // Asigna los datos al array provincias
    });
  }

  cargarProvincias() {
    this.provinciaService.getAllProvincias().subscribe((response) => {
      this.listProvincias = response; // Asigna los datos al array provincias
    });
  }

  cargarCiudades() {
    this.listCiudades = [];

    if (
      this.selectProvincia !== undefined &&
      this.selectProvincia.proId !== undefined
    ) {
      const proId = this.selectProvincia.proId as number; // Realiza un type casting a number
      this.ciudadService.getCiudadByProv(proId).subscribe((response) => {
        this.listCiudades = response; // Asigna los datos al array provincias
      });
    }
  }

  designarRol(): boolean {
    const rolEncontrado = this.listRoles.find(
      (rol) => rol.rolId.toString() === this.usuario.rolId?.rolId.toString()
    );

    if (rolEncontrado) {
      this.usuario.rolId = rolEncontrado;
      // console.log(this.usuario.rolId)
      return true;
    } else {
      // Manejar el caso en el que no se encontró un rol
      console.log('No se encontró un rol con el ID correspondiente.');
      return false;
    }
  }

  registrar() {
    if (this.validarRegistro()) {
      this.personaService.cedulaUnica(this.persona.perCedula?.trim() || '').subscribe((response) => {
        if (response) {
          this.usuarioService.usuarioUnico(this.usuario.usuNombreUsuario?.trim() || '').subscribe((res) => {
            if (res) {
              const rolEncontrado = this.listRoles.find(rol => rol.rolId.toString() === this.usuario.rolId?.rolId.toString());

              if (rolEncontrado) {
                this.usuario.rolId.rolNombre = rolEncontrado.rolNombre;

                // REGISTRAR PERSONA
                this.personaService.registrarPersona(this.persona).subscribe((response) => {
                  this.usuario.usuEstado = 1;
                  this.usuario.usuPerId = response;

                  this.usuario.usuSaldoVacacional = 0;
                  // REGISTRAR USUARIO
                  this.usuarioService.registrarUsuario(this.usuario).subscribe((response) => {
                    Swal.fire({
                      title: '¡Registro Exitoso!',
                      text: `${this.persona.perNombre} ${this.persona.perApellido} (${this.usuario.rolId.rolNombre}) agregado correctamente`,
                      icon: 'success',
                      confirmButtonText: 'Confirmar',
                      showCancelButton: false, // No mostrar el botón de cancelar
                    }).then(() => {
                      this.limpiarRegistro();
                      this.router.navigate(['/listausu']);
                    });
                  });
                });
              }
            } else {
              this.toastr.error('El nombre de usuario que ingresaste ya se encuentra registrado', 'Usuario duplicado', {
                timeOut: this.timeToastr,
              });
            }
          });
        } else {
          this.toastr.error('La cédula que ingresaste ya se encuentra registrada', 'Cédula duplicada', {
            timeOut: this.timeToastr,
          });
        }
      });
    }
  }

  editar() {
    if (this.validarRegistro()) {
      const rolEncontrado = this.listRoles.find(
        (rol) => rol.rolId.toString() === this.usuario.rolId?.rolId.toString()
      );
      if (rolEncontrado) {
        this.usuario.rolId.rolNombre = rolEncontrado.rolNombre;
        // console.log(this.usuario.rolId)

        //REGISTRAR PERSONA
        this.personaService
          .update(this.persona.perId, this.persona)
          .subscribe((response) => {
            this.usuario.usuEstado = 1;
            this.usuario.usuPerId = response;

            //RESGISTRAR USUARIO
            this.usuarioService
              .update(this.usuario.usuId, this.usuario)
              .subscribe((response) => {
                Swal.fire({
                  title: '¡Edición Exitosa!',
                  text: `${this.persona.perNombre} ${this.persona.perApellido} (${this.usuario.rolId.rolNombre}) actualizado correctamente`,
                  icon: 'success',
                  confirmButtonText: 'Confirmar',
                  showCancelButton: false, // No mostrar el botón de cancelar
                }).then(() => {
                  this.limpiarRegistro();
                  switch (this.mode) {

                    case "edit-user":
                      this.router.navigate(['/listausu']);

                      break;
                    case "edit-profile":

                      this.router.navigate(['/perfil']);

                      break;
                    default:
                      this.router.navigate(['/perfil']);
                  }

                });
              });
          });

        // return true
      }
    }
  }

  validarRegistro(): boolean {
    //CEDULA
    if (!this.persona.perCedula) {
      this.toastr.error(
        'Cedula es un campo obligatorio',
        'Ingrese un numero de identificación',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (!validarCedula(this.persona.perCedula)) {
        this.toastr.error(
          'Digite correctamente su numero de identificación',
          'Cedula invalido',
          {
            timeOut: this.timeToastr,
          }
        );
        return false;
      }
    }

    //NOMBRES
    if (!this.persona.perNombre) {
      this.toastr.error(
        'Nombre es un campo obligatorio',
        'Ingrese los nombres del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //FOTO
    if (!this.usuario.foto) {
      this.toastr.warning(
        'No olvide ingresar una foto del usuario',
        '',
        {
          timeOut: this.timeToastr,
        }
      );
    }

    //APELLIDOS
    if (!this.persona.perApellido) {
      this.toastr.error(
        'Apellido es un campo obligatorio',
        'Ingrese los apellidos del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //FECHA DE NACIMIENTO
    if (calcularEdad(this.persona.perFechaNacimiento) < this.edadMinima) {
      this.toastr.error('Debe ser mayor de edad para registrarse', '', {
        timeOut: 3000,
      });
      return false;
    }

    //PROVINCIA
    if (this.selectProvincia.proId <= 0) {
      this.toastr.error(
        'Provincia es un campo obligatorio',
        'Seleccione una provincia',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //CIUDAD
    if (this.persona.ciuId.ciuId <= 0) {
      this.toastr.error(
        'Ciudad es un campo obligatorio',
        'Seleccione una ciudad',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //TELEFONO
    if (!this.persona.perTelefono) {
      this.toastr.error(
        'Teléfono es un campo obligatorio',
        'Ingrese el teléfono del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //DIRECCION
    if (!this.persona.perDireccion) {
      this.toastr.error(
        'Dirección es un campo obligatorio',
        'Ingrese la dirección del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //NOMBRE DE USUARIO
    if (!this.usuario.usuNombreUsuario) {
      this.toastr.error(
        'Nombre de usuario es un campo obligatorio',
        'Ingrese un nombre de usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    // CORREO ELECTRONICO

    if (!this.usuario.usuCorreo) {
      this.toastr.error(
        'Correo es un campo obligatorio',
        'Ingrese el correo del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (!validarCorreo(this.usuario.usuCorreo)) {
        this.toastr.error(
          'Digite correctamente el correo electronico',
          'Correo invalido',
          {
            timeOut: this.timeToastr,
          }
        );
        return false;
      }
    }

    //CONTRASEÑA
    if (!this.usuario.usuContrasena && !this.editeMode) {
      this.toastr.error(
        'Contraseña es un campo obligatorio',
        'Ingrese la contraseña del usuario',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    //CONFIRMACION DE CONTRASEÑA

    if (!this.confirmarPass && !this.editeMode) {
      this.toastr.error(
        'Es obligatorio confirmar la contraseña',
        'Confirme la contraseña',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    } else {
      if (this.usuario.usuContrasena !== this.confirmarPass) {
        this.toastr.error(
          'Las contraseñas no coinciden, digite correctamente',
          'La contraseñá no coincide',
          {
            timeOut: this.timeToastr,
          }
        );

        return false;
      }
    }

    //ROL
    if (this.usuario.rolId.rolId <= 0) {
      this.toastr.error(
        'Debe seleccionar el rol del usuario',
        'Seleccione el rol',
        {
          timeOut: this.timeToastr,
        }
      );

      return false;
    }

    return true;
  }

  limpiarRegistro() {
    this.usuario = new Usuario();
    this.persona = new Persona();
    this.listCiudades = [];
    this.selectProvincia = new Provincia();
    this.confirmarPass = '';
  }

  /// RESTRICCION DE TECLAS
  validarLetras(event: KeyboardEvent) {
    validarLetras(event);
  }
  validarNumeros(event: KeyboardEvent) {
    validarNumeros(event);
  }
  validarLetrasNum(event: KeyboardEvent) {
    validarLetrasNum(event);
  }

  crearRol() {
    Swal.fire({
      title: 'Crear Nuevo Rol',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Rol">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    });
  }
}
