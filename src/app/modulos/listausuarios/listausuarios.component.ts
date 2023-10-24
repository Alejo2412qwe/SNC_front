import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/modelo/persona';
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
    private usuarioService: UsuarioService, private toastr: ToastrService, private sessionStorage: SessionStorageService,) { }

  ngOnInit(): void {

    //  this.listarUsuarios();
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  // listarUsuarios(): void {
  //   this.serper.getPersonas.subcribe(
  //     users => this.usuariosAct = users
  //   );
  // }

}
