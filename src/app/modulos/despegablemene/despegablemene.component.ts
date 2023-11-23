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
  ) { }

  username = this.sessionStorage.getItem('username');
  tiempoRestante: number = 30 * 60; // 30 minutos en segundos
  tiempoFormateado: string = '30:00'; // Inicializar con el tiempo inicial

  cerrarSesion(): void {
    localStorage.removeItem('userData');
    this.toastr.info('Se ha cerrado la sesión');
  }
  ngOnInit(): void {
    this.actualizarContador();
  }

  private actualizarContador() {
    const contadorInterval = setInterval(() => {
      const minutos = Math.floor(this.tiempoRestante / 60);
      const segundos = this.tiempoRestante % 60;

      const minutosStr = minutos < 10 ? '0' + minutos : minutos;
      const segundosStr = segundos < 10 ? '0' + segundos : segundos;

      this.tiempoFormateado = `${minutosStr}:${segundosStr}`;

      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        alert('Tiempo agotado');
        clearInterval(contadorInterval);
      }
    }, 1000);
  }

}
