import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/modelo/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

  usuariosAct: Persona[] = [];

  constructor(private serper: PersonaService, private activatedRoute: ActivatedRoute,) { }

   ngOnInit(): void {

  //  this.listarUsuarios();
  }


  // listarUsuarios(): void {
  //   this.serper.getPersonas.subcribe(
  //     users => this.usuariosAct = users
  //   );
  // }

}
