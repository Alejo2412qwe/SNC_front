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
    this.getAllPermisos();
  }


  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  listaPermisos: Permisos[] = [];

  getAllPermisos() {
    this.showInfo();
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
    this.permisoService.updateEst(id, est).subscribe((data) => {
      if (est === 1) {
        this.toastr.success('EL PERMISO HA SIDO APROBADO POR JEFE GENERAL');
      } else if (est === 2) {
        this.toastr.success('EL PERMISO HA SIDO APROBADO POR JEFE DE UNIDAD');
      } else if (est === 4) {
        this.toastr.warning('EL PERMISO HA SIDO RECHAZADO');
      }
    });
  }

  downloadFile(base64Data: string, name: string) {
    decodeBase64PDF(base64Data, name, this.toastr)
  }
}
