import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  constructor(private AllScripts: AllScriptsService) 
  {
    AllScripts.Cargar(["calendario"]);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
