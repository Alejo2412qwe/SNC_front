import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { SessionStorageService } from '../../services/session-storage.service'; // Importa SessionStorageService

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css'],
})
export class GestionComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private AllScripts: AllScriptsService,
    private sessionStorage: SessionStorageService
  ) {

    AllScripts.Cargar(["reportes"]);
  }
  username = this.sessionStorage.getItem('username');

  ngOnInit(): void { }
}