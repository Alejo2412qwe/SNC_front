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
    this.sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjIiLCJpYXQiOjE2OTY1NDQ2OTEsImV4cCI6MTY5NjYzMTA5MX0.vJKjEU3cRn8BOSYd_Ufjv8dO2wCMZfvu8aamShyaSLw');

  }

}
