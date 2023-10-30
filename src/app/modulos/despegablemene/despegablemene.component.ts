import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

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
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService
  ) {}

  username = this.sessionStorage.getItem('username');

  cerrarSesion(): void {
    localStorage.removeItem('userData');
    this.toastr.info('Se ha cerrado la sesión');
  }
  ngOnInit(): void {}
}
