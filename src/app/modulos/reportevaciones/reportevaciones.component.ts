import { Component, OnInit } from '@angular/core';
import { Vacaciones } from 'src/app/modelo/vacaciones';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-reportevaciones',
  templateUrl: './reportevaciones.component.html',
  styleUrls: ['./reportevaciones.component.css']
})
export class VacacionesComponent implements OnInit {

  constructor(private VacacionesService: AllScriptsService) {
    AllScripts.Cargar(["reportes"]);
  }
  ngOnInit(): void {
    

  }

}
