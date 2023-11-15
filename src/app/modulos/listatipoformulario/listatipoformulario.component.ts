import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { showErrorAlCrear, validarCadena } from 'src/app/common/validaciones';
import { TipoFormulario } from 'src/app/modelo/tipoformulario';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { TipoFormularioService } from 'src/app/services/tipoformulario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listatipoformulario',
  templateUrl: './listatipoformulario.component.html',
  styleUrls: ['./listatipoformulario.component.css'],
})
export class ListatipoformularioComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
    private tipformularioService: TipoFormularioService
  ) {}
  ngOnInit(): void {
    this.cargarTipoForm();
    this.loadTipoFormByEstado(1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //listas
  listatipoformulario: TipoFormulario[] = [];

  //variables
  TipoFormulario: TipoFormulario = new TipoFormulario();
  newTipoFormulario: string = '';

  cargarTipoForm() {
    this.tipformularioService.getAllTipoFormulario().subscribe((data) => {
      this.listatipoformulario = data;
    });
  }

  loadTipoFormByEstado(est: number) {
    this.tipformularioService
      .getTipoFormularioByEstado(est)
      .subscribe((response) => {
        this.listatipoformulario = response; // Asigna los datos al array Funciones
      });
  }

  saveTipoForm() {
    this.tipformularioService
      .saveTipoFormulario(this.TipoFormulario)
      .subscribe((data) => {
        this.loadTipoFormByEstado(1);
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.tiFoNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearTipoForm() {
    Swal.fire({
      title: 'Crear Nuevo Tipo de Permiso',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Ingrese el tipo de formulario" [(ngModel)]="TipoFormulario.tiFoNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newTipoFormulario = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;

        if (validarCadena(this.newTipoFormulario)) {
          this.TipoFormulario.tiFoNombre = this.newTipoFormulario;
          this.saveTipoForm();
          this.loadTipoFormByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  openUpdateTipoForm(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Ingrese el tipo de formulario" [(ngModel)]="TipoFormulario.tiFoNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newTipoFormulario = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;

        if (validarCadena(this.newTipoFormulario)) {
          this.TipoFormulario.tiFoNombre = this.newTipoFormulario;
          this.updateTipoForm(id);
          this.loadTipoFormByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateTipoForm(id: number) {
    this.tipformularioService
      .updateTipoFormulario(this.TipoFormulario, id)
      .subscribe((data) => {
        this.loadTipoFormByEstado(1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.tiFoNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstTipoForm(id: number, est: number) {
    Swal.fire({
      title: `Se deshabilitará el tipo de formulario, ¿Està seguro de ello?`,
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
        this.tipformularioService.updateEst(id, est).subscribe({
          next: () => {
            this.loadTipoFormByEstado(1);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {},
        });
      } else if (result.isDenied) {
        this.loadTipoFormByEstado(1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }
}
