import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { calcularEdad } from 'src/app/common/validaciones';
import { Persona } from 'src/app/modelo/persona';
import { Usuario } from 'src/app/modelo/usuario';
import { PersonaService } from 'src/app/services/persona.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

  usuariosAct: Persona[] = [];

  constructor(private serper: PersonaService, private activatedRoute: ActivatedRoute, private router: Router,
    //SERVICES
    private usuarioService: UsuarioService, private toastr: ToastrService, private sessionStorage: SessionStorageService,) {
    this.estList = 1;
  }

  ngOnInit(): void {
    this.setActive()
    this.loadUsers(this.estList);
  }
  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');
  searchString: string = '';
  listUsers: Usuario[] = [];
  estList: number = 1; // Inicialmente establecido en 1 para "Activo"

  updateSelection(value: number) {
    this.estList = value;
  }
  setActive() {
    this.estList = 1; // Cambia el valor de estList a 1
  }
  calcularEdad(fechaNacimiento: Date) {
    return calcularEdad(fechaNacimiento)
  }


  loadUsers(est: number) {
    this.usuarioService.allUsersData(est).subscribe((response) => {
      this.listUsers = response; // Asigna los datos al array provincias
    });
  }

  searchUser(search: string, est: number) {
    this.usuarioService.searchUsersData(search, est).subscribe((response) => {
      this.listUsers = response; // Asigna los datos al array provincias
    });
  }

  updateEstUser(id: number, est: number) {
    this.usuarioService.updateEst(id, est).subscribe({
      next: () => {
        console.log('eliminado')
        this.loadUsers(1)
      },
      error: (error) => {
        // Manejar errores
      },
      complete: () => {
        // Manejar completado
      }
    });

  }
}



