import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelo/persona';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../../services/session-storage.service'; // Importa SessionStorageService
import { Provincia } from 'src/app/modelo/provincia';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { Router } from '@angular/router';
import { Ciudad } from 'src/app/modelo/ciudad';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Usuario } from 'src/app/modelo/usuario';
import { Rol } from 'src/app/modelo/rol';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private sessionStorage: SessionStorageService,
    private router: Router, private toastr: ToastrService,
    //SERVICES
    private provinciaService: ProvinciaService, private ciudadService: CiudadService,
    private personaService: PersonaService, private rolService: RolService, private usuarioService: UsuarioService
  ) { }




  //OBJETOS
  persona: Persona = new Persona();
  usuario: Usuario = new Usuario();
  selectProvincia: Provincia = new Provincia();
  selectRol: Rol = new Rol();

  //VARIABLES
  confirmarPass: string = '';

  //LISTAS
  listProvincias: Provincia[] = [];
  listCiudades: Ciudad[] = [];
  listRoles: Rol[] = [];

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarProvincias()
  }

  cargarRoles() {
    this.rolService.getAllRoles().subscribe(
      response => {
        this.listRoles = response; // Asigna los datos al array provincias
      }
    );
  }

  cargarProvincias() {
    this.provinciaService.getAllProvincias().subscribe(
      response => {
        this.listProvincias = response; // Asigna los datos al array provincias
      }
    );
  }

  cargarCiudades() {
    this.listCiudades = [];


    if (this.selectProvincia !== undefined && this.selectProvincia.proId !== undefined) {
      const proId = this.selectProvincia.proId as number; // Realiza un type casting a number
      this.ciudadService.getCiudadByProv(proId).subscribe(
        response => {
          this.listCiudades = response; // Asigna los datos al array provincias
        }
      );


    }
  }


  designarRol(): boolean {

    const rolEncontrado = this.listRoles.find((rol) => rol.rolId.toString() === this.usuario.rolId?.rolId.toString());


    if (rolEncontrado) {
      this.usuario.rolId = rolEncontrado;
      // console.log(this.usuario.rolId)
      return true
    } else {
      // Manejar el caso en el que no se encontró un rol
      console.log('No se encontró un rol con el ID correspondiente.');
      return false;
    }

  }

  registrar() {

    // if (this.designarRol()) {

    const rolEncontrado = this.listRoles.find((rol) => rol.rolId.toString() === this.usuario.rolId?.rolId.toString());
    if (rolEncontrado) {
      this.usuario.rolId.rolNombre = rolEncontrado.rolNombre;
      // console.log(this.usuario.rolId)
      console.log(this.usuario.rolId)

      //REGISTRAR PERSONA
      this.personaService.registrarPersona(this.persona).subscribe(
        response => {

          this.usuario.usuEstado = 1;
          this.usuario.usuPerId = response;


          //RESGISTRAR USUARIO
          this.usuarioService.registrarUsuario(this.usuario).subscribe(
            response => {
              Swal.fire({
                title: '¡Registro Exitoso!',
                text: response.rolId + ' agregado correctamente',
                icon: 'success',
                confirmButtonText: 'Confirmar',
                showCancelButton: false, // No mostrar el botón de cancelar
              }).then(() => {
                this.limpiarRegistro();
              });
            }

          )

        }
      )


      return true
    } else {
      // Manejar el caso en el que no se encontró un rol
      console.log('No se encontró un rol con el ID correspondiente.');
      return false;
    }

  }


  limpiarRegistro() {
    this.usuario = new Usuario();
    this.persona = new Persona();
    this.listCiudades = [];
    this.selectProvincia = new Provincia();
    this.confirmarPass = '';
  }




}