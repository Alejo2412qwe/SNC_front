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
import { Institucion } from 'src/app/modelo/Institucion';
import { Ciudad } from 'src/app/modelo/ciudad';
import { Persona } from 'src/app/modelo/persona';
import { Procesos } from 'src/app/modelo/procesos';
import { Provincia } from 'src/app/modelo/provincia';
import { Rol } from 'src/app/modelo/rol';
import { Subprocesos } from 'src/app/modelo/subprocesos';
import { TipoInstitucion } from 'src/app/modelo/tipoInstitucion';
import { Usuario } from 'src/app/modelo/usuario';
import { CiudadService } from 'src/app/services/ciudad.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { RolService } from 'src/app/services/rol.service';
import { SubprocesosService } from 'src/app/services/subprocesos.service';
import { tipoInstitucionService } from 'src/app/services/tipoInstitucion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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
    private activatedRoute: ActivatedRoute
  ) {}

  //OBJETOS
  persona: Persona = new Persona();
  usuario: Usuario = new Usuario();
  selectProvincia: Provincia = new Provincia();
  selectRol: Rol = new Rol();
  subproceso: Subprocesos = new Subprocesos();
  proceso: Procesos = new Procesos();
  institucion: Institucion = new Institucion();
  tipInstitucion: TipoInstitucion = new TipoInstitucion();
  procesoSelected: Procesos = new Procesos();

  //VARIABLES
  confirmarPass: string = '';
  timeToastr: number = 4000;
  edadMinima = 18;
  newSubproceso: string = '';
  newInstitucion: string = '';
  newProceso: string = '';
  id: number = 0;
  editeMode: boolean = false;
  //LISTAS
  listProvincias: Provincia[] = [];
  listCiudades: Ciudad[] = [];
  listRoles: Rol[] = [];
  listaProcesos: Procesos[] = [];
  listaSubprocesos: Subprocesos[] = [];
  listaInstituciones: Institucion[] = [];
  listaTipoInstitucion: TipoInstitucion[] = [];

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarProvincias();
    this.cargarProcesos();
    this.validateMode();
    this.cargarInstituciones();
    this.cargarTipoInstitucion();
  }

  validateMode() {
    this.activatedRoute.params.subscribe((params) => {
      const userId = params['id'];

      if (userId !== undefined) {
        this.editeMode = true;
        this.loadEdit(userId);
      } else {
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
      this.usuario.usuContrasena = '';
      this.persona = response.usuPerId;
    });
  }

  getSubprocesosByProcesoId() {
    this.listaSubprocesos = [];

    if (
      this.procesoSelected !== undefined &&
      this.procesoSelected.procId !== undefined
    ) {
      const procId = this.procesoSelected.procId as number; // Realiza un type casting a number
      this.subprocesosService
        .getSubprocesosByProcesoId(procId)
        .subscribe((response) => {
          this.listaSubprocesos = response; // Asigna los datos al array provincias
        });
    }
  }

  cargarInstituciones() {
    this.institucionService.getAllInstituciones().subscribe((data) => {
      this.listaInstituciones = data;
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
      this.personaService
        .cedulaUnica(this.persona.perCedula?.trim() || '')
        .subscribe((response) => {
          if (response) {
            this.usuarioService
              .usuarioUnico(this.usuario.usuNombreUsuario?.trim() || '')
              .subscribe((res) => {
                if (res) {
                  const rolEncontrado = this.listRoles.find(
                    (rol) =>
                      rol.rolId.toString() ===
                      this.usuario.rolId?.rolId.toString()
                  );
                  if (rolEncontrado) {
                    this.usuario.rolId.rolNombre = rolEncontrado.rolNombre;
                    // console.log(this.usuario.rolId)
                    console.log(this.usuario.rolId);

                    //REGISTRAR PERSONA
                    this.personaService
                      .registrarPersona(this.persona)
                      .subscribe((response) => {
                        this.usuario.usuEstado = 1;
                        this.usuario.usuPerId = response;

                        //RESGISTRAR USUARIO
                        this.usuarioService
                          .registrarUsuario(this.usuario)
                          .subscribe((response) => {
                            Swal.fire({
                              title: '¡Registro Exitoso!',
                              text: response.rolId + ' agregado correctamente',
                              icon: 'success',
                              confirmButtonText: 'Confirmar',
                              showCancelButton: false, // No mostrar el botón de cancelar
                            }).then(() => {
                              this.limpiarRegistro();
                              this.router.navigate(['/listausu']);
                            });
                          });
                      });

                    // return true
                  }
                } else {
                  this.toastr.error(
                    'El nombre de usuario que ingresaste ya se encuentra registrado',
                    'Usuario duplicado',
                    {
                      timeOut: this.timeToastr,
                    }
                  );
                }
              });
          } else {
            this.toastr.error(
              'La cédula que ingresaste ya se encuantra registrada',
              'Cédula duplicada',
              {
                timeOut: this.timeToastr,
              }
            );
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
                  text: response.rolId + ' agregado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Confirmar',
                  showCancelButton: false, // No mostrar el botón de cancelar
                }).then(() => {
                  this.limpiarRegistro();
                  this.router.navigate(['/listausu']);
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
