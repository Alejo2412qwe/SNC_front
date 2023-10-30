import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-despegablemene',
  templateUrl: './despegablemene.component.html',
  styleUrls: ['./despegablemene.component.css'],
})
export class DespegablemeneComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private AllScripts: AllScriptsService,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {}

  username = this.sessionStorage.getItem('username');

  cerrarSesion(): void {
    localStorage.removeItem('userData');
  }
  ngOnInit(): void {}
}
