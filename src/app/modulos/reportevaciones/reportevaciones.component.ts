import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-reportevaciones',
  templateUrl: './reportevaciones.component.html',
  styleUrls: ['./reportevaciones.component.css']
})
export class ReportevacionesComponent implements OnInit {

  constructor(private AllScripts: AllScriptsService) {
    AllScripts.Cargar(["reportes"]);
  }
  ngOnInit(): void {


  }

}
