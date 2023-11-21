import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { base64PDFpreview, decodeBase64PDF } from 'src/app/common/base64';
import { Permisos } from 'src/app/modelo/permisos';
import { PermisoService } from 'src/app/services/permiso.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aprobarpermisos',
  templateUrl: './aprobarpermisos.component.html',
  styleUrls: ['./aprobarpermisos.component.css']
})
export class AprobarpermisosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
    private permisoService: PermisoService,
  ) { }
  ngOnInit(): void {
    this.showInfo();
    this.getPermisos();
  }


  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  listaPermisos: Permisos[] = [];
  searchString: string = '';

  getPermisos() {
    if (this.rol === 'Administrador') {
      this.getPermisosForAdmin(2);
    } else {
      this.getPermisosByIdJefe(this.sessionStorage.getItem('userId') || 0);
    }
  }

  searchPermisos(search: string, est: number) {
    this.permisoService.searchPermisos(search, est).subscribe((data) => {
      this.listaPermisos = data
    })
  }

  getPermisosForAdmin(est: number) {
    this.permisoService.getPermisosForAdmin(est).subscribe((data) => {
      this.listaPermisos = data;
    });
  }

  getPermisosByIdJefe(id: number) {
    this.permisoService.getPermisosByIdJefe(id).subscribe((data) => {
      this.listaPermisos = data;
    });
  }

  getFormattedTime(time: string): string {
    const hour = parseInt(time.slice(0, 2), 10);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format

    return `${formattedHour} ${amPm}`;
  }

  showInfo() {
    Swal.fire({
      title: 'Bienvenido a la aprobación de permisos',
      html:
        'Recuerde revisar que la información de los permisos sea la adecuada.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  }

  updateEstadoPermisos(id: number, est: number) {
    Swal.fire({
      title: `Está a punto de aprobar/denegar la solicitud N°` + id + `, ¿desea continuar?`,
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
    }).then((res) => {
      if (res.isConfirmed) {
        this.permisoService.updateEst(id, est).subscribe((data) => {
          setTimeout(() => {
            location.reload();
          }, 400);
          if (est === 1) {
            this.toastr.success('EL PERMISO HA SIDO APROBADO POR JEFE GENERAL');
          } else if (est === 2) {
            this.toastr.success('EL PERMISO HA SIDO APROBADO POR JEFE DE UNIDAD');
          } else if (est === 4) {
            this.toastr.warning('EL PERMISO HA SIDO RECHAZADO');
          }
        });
      } else if (res.isDenied) {
        this.toastr.warning('Acción Cancelada');
      }
    })

  }

  downloadFile(base64Data: string, name: string) {
    decodeBase64PDF(base64Data, name, this.toastr)
  }

  previewBase64PDF(base64: string, filename: string) {
    base64PDFpreview(base64, filename)
  }
}
