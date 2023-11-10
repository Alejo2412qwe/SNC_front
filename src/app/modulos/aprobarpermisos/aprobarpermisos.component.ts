import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { decodeBase64PDF } from 'src/app/common/base64';
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
    this.getAllPermisos();
  }


  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  listaPermisos: Permisos[] = [];

  getAllPermisos() {
    this.permisoService.getAllPermisos().subscribe((data) => {
      this.listaPermisos = data;
    });
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
      title: `Está a punto de aprobar la solicitud N°`+id+`, ¿desea continuar?`,
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
}
