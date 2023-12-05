import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  showErrorAlCrear,
  showMasRegistros,
  validarDouble,
} from 'src/app/common/validaciones';
import { ValorHora } from 'src/app/modelo/valorhora';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ValorHoraService } from 'src/app/services/valorhora.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listavalorhora',
  templateUrl: './listavalorhora.component.html',
  styleUrls: ['./listavalorhora.component.css'],
})
export class ListavalorhoraComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
    private valorhoraService: ValorHoraService
  ) { }

  ngOnInit(): void {
    this.loadValorByEstado(1);
  }

  paraBoton() {
    this.showInfo();
    this.loadValorByEstado(1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //listas
  listaValor: ValorHora[] = [];

  //variables
  ValorHora: ValorHora = new ValorHora();
  newValor: string = '';
  newDouble: number = 0;

  loadValorByEstado(est: number) {
    this.valorhoraService.getValorHoraByEstado(est).subscribe((response) => {
      this.listaValor = response; // Asigna los datos al array Funciones
    });
  }

  saveValor() {
    this.valorhoraService.saveValorHora(this.ValorHora).subscribe((data) => {
      this.loadValorByEstado(1);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: data.valorHora + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  updateValor(id: number) {
    this.valorhoraService.updateValor(this.ValorHora, id).subscribe((data) => {
      this.loadValorByEstado(1);
      Swal.fire({
        title: 'Edición Exitosa!',
        text: 'El valor ' + data.valorHora + ' ha sido agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  showInfo() {
    Swal.fire({
      title: 'Información Importante',
      text:
        'Al haber creado el valor, solo podrá modificarlo debido a que es un valor único.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  }

  openCrearValor() {
    this.valorhoraService.getValorUnico().subscribe((numeroDeRegistros) => {
      if (numeroDeRegistros < 1) {
        Swal.fire({
          title: 'Crear Nuevo Valor',
          html: `
            <p style="color: red;">(solo números con punto decimal)</p>
            <input id="swal-input1" class="swal2-input" placeholder="Ingrese el valor" [(ngModel)]="ValorHora.valorHora">
          `,
          showCancelButton: true,
          confirmButtonText: 'Crear',
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            this.newValor = (
              document.getElementById('swal-input1') as HTMLInputElement
            ).value;
            this.newDouble = parseFloat(this.newValor);
            if (validarDouble(this.newValor)) {
              this.ValorHora.valorHora = this.newDouble;
              this.saveValor();
              this.loadValorByEstado(1);
            } else {
              showErrorAlCrear();
            }
          },
        });
      } else {
        showMasRegistros();
      }
    });
  }

  openUpdateValor(id: number) {
    Swal.fire({
      title: 'Editar',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Ingrese el valor" [(ngModel)]="ValorHora.valorHora">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newValor = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.newDouble = parseFloat(this.newValor);
        if (validarDouble(this.newValor)) {
          const fechaActual = new Date();
          this.ValorHora.valorHora = this.newDouble;
          this.ValorHora.valorFecha = fechaActual;
          this.updateValor(id);
          this.loadValorByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }
}
