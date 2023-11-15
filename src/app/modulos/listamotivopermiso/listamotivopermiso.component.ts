import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { showErrorAlCrear, validarCadena } from 'src/app/common/validaciones';
import { MotivoPermiso } from 'src/app/modelo/MotivoPermiso';
import { MotivoPermisoService } from 'src/app/services/motivopermiso.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listamotivopermiso',
  templateUrl: './listamotivopermiso.component.html',
  styleUrls: ['./listamotivopermiso.component.css'],
})
export class ListamotivopermisoComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private motivopermisoService: MotivoPermisoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarMotivos();
    this.loadMotivosByEstado(1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //listas
  listaMotivos: MotivoPermiso[] = [];

  //variables
  MotivoPermiso: MotivoPermiso = new MotivoPermiso();
  newMotivo: string = '';

  cargarMotivos() {
    this.motivopermisoService.getAllMotivoPermiso().subscribe((data) => {
      this.listaMotivos = data;
    });
  }

  loadMotivosByEstado(est: number) {
    this.motivopermisoService.getMotivosByEstado(est).subscribe((response) => {
      this.listaMotivos = response; // Asigna los datos al array Funciones
    });
  }

  saveMotivo() {
    this.motivopermisoService
      .saveMotivo(this.MotivoPermiso)
      .subscribe((data) => {
        this.loadMotivosByEstado(1);
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.motNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearMotivo() {
    Swal.fire({
      title: 'Crear Nuevo Motivo',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Ingrese el motivo" [(ngModel)]="MotivoPermiso.motNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newMotivo = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newMotivo)) {
          this.MotivoPermiso.motNombre = this.newMotivo;
          this.saveMotivo();
          this.loadMotivosByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  openUpdateMotivo(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Ingrese el nuevo motivo" [(ngModel)]="MotivoPermiso.motNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newMotivo = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newMotivo)) {
          this.MotivoPermiso.motNombre = this.newMotivo;
          this.updateMotivo(id);
          this.loadMotivosByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateMotivo(id: number) {
    this.motivopermisoService
      .updateMotivo(this.MotivoPermiso, id)
      .subscribe((data) => {
        this.loadMotivosByEstado(1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.motNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstMotivo(id: number, est: number) {
    Swal.fire({
      title: `Se deshabilitará el motivo, ¿Està seguro de ello?`,
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
        this.motivopermisoService.updateEst(id, est).subscribe({
          next: () => {
            this.loadMotivosByEstado(1);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {},
        });
      } else if (result.isDenied) {
        this.loadMotivosByEstado(1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }
}
