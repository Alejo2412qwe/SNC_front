import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { SessionStorageService } from '../../services/session-storage.service'; // Importa SessionStorageService

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {


  constructor(private renderer: Renderer2, private el: ElementRef, private AllScripts: AllScriptsService,
    private sessionStorage: SessionStorageService) {

    AllScripts.Cargar(["side"]);

  }
  ngOnInit(): void {
    this.sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEiLCJpYXQiOjE2OTY2MzgzMzgsImV4cCI6MTY5NjcyNDczOH0.hxLG_kOLcb1LuRS0c5IIArGLWf1SuZebc2aIymkchVM');

  }

}
