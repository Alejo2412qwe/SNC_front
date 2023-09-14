import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {


  constructor(private renderer: Renderer2, private el: ElementRef, private AllScripts: AllScriptsService) {

    AllScripts.Cargar(["side"]);

  }
  ngOnInit(): void {


  }

}
