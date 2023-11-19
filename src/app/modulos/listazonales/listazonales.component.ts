import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { showErrorAlCrear, validarCadena } from 'src/app/common/validaciones';
import { Zonales } from 'src/app/modelo/zonales';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ZonalService } from 'src/app/services/zonal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listazonales',
  templateUrl: './listazonales.component.html',
  styleUrls: ['./listazonales.component.css']
})
export class ListazonalesComponent implements OnInit {

  constructor(
    private sessionStorage: SessionStorageService,
    private zonalesService: ZonalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadZonalesByEstado(1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');



  //OBJETOS
  zonal: Zonales = new Zonales();

  //VARIABLES
  newZonal: string = '';
  newCodigo: string = '';

  //LISTAS
  listaZonales: Zonales[] = [];

  loadZonalesByEstado(est: number) {
    this.zonalesService.getZonalesByEstado(est).subscribe((data) => {
      this.listaZonales = data;
    });
  }

  saveZonal() {
    this.zonalesService.saveZonal(this.zonal).subscribe((data) => {
      this.loadZonalesByEstado(1);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: data.zonNombre + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  openCrearZonal() {
    Swal.fire({
      title: 'Crear Nueva Zonal',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Nombre De La Zonal" [(ngModel)]="zonal.zonNombre"><input id="swal-input2" class="swal2-input" placeholder="Nombre De La Zonal" [(ngModel)]="zonal.zonNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newZonal = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        this.newCodigo = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newZonal) && validarCadena(this.newCodigo)) {
          this.zonal.zonNombre = this.newZonal;
          this.zonal.zonCodigo = this.newCodigo;
          this.saveZonal();
          this.loadZonalesByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateZonal(id: number) {
    this.zonalesService
      .updateZonal(this.zonal, id)
      .subscribe((data) => {
        this.loadZonalesByEstado(1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.zonNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstZonal(id: number, est: number) {
    Swal.fire({
      title: `Va a eliminar la zonal, ¿Està seguro de ello?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.zonalesService.updateEst(id, est).subscribe({
          next: () => {
            this.loadZonalesByEstado(1);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => { },
        });
      } else if (result.isDenied) {
        this.loadZonalesByEstado(1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  openUpdateZonal(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Nombre De La Zonal" [(ngModel)]="zonal.zonNombre"><input id="swal-input2" class="swal2-input" placeholder="Nombre De La Zonal" [(ngModel)]="zonal.zonNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newZonal = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        this.newCodigo = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newZonal) && validarCadena(this.newCodigo)) {
          this.zonal.zonNombre = this.newZonal;
          this.zonal.zonCodigo = this.newCodigo;
          this.updateZonal(id);
          this.loadZonalesByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

}
