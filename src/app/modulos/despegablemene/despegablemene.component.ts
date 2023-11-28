import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-despegablemene',
  templateUrl: './despegablemene.component.html',
  styleUrls: ['./despegablemene.component.css'],
})
export class DespegablemeneComponent implements OnInit {
  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService
  ) { }

  username = this.sessionStorage.getItem('username');
  tiempoRestante: number = 30 * 60; // 30 minutos en segundos
  tiempoFormateado: string = '00:00'; // Inicializar con el tiempo inicial

  cerrarSesion(): void {
    localStorage.removeItem('userData');
  }

  salir(): void {
    this.toastr.info('Se ha cerrado la sesión');
    this.cerrarSesion();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.actualizarContador();
  }

  private actualizarContador() {
    const contadorInterval = setInterval(() => {
      const tiempoRestante = parseInt(this.sessionStorage.getItem('tiempoRestante') || '0', 10);

      const minutos = Math.floor(tiempoRestante / 60);
      const segundos = tiempoRestante % 60;

      const minutosStr = minutos < 10 ? '0' + minutos : minutos;
      const segundosStr = segundos < 10 ? '0' + segundos : segundos;

      // Actualizar la UI con el tiempo formateado
      this.tiempoFormateado = `${minutosStr}:${segundosStr}`;

      if (tiempoRestante > 0) {
        // Actualizar el tiempo restante en la sesión
        this.sessionStorage.setItem('tiempoRestante', (tiempoRestante - 1).toString());

        // Mostrar mensaje cuando falten 2 minutos
        if (tiempoRestante === 120) {
          Swal.fire({
            title: 'La sesión caducará en 2 minutos',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } else {
        clearInterval(contadorInterval);

        // Verificar si la sesión ya se cerró antes de mostrar el mensaje
        if (this.sessionStorage.getItem('tiempoRestante') === null) {
          return;
        }

        this.salir();
      }
    }, 1000);
  }

}
