import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  updateEstadoPermisos(id: number, est: string) {
    this.permisoService.updateEst(id, est).subscribe((data) => {
      if (est === 'A') {
        this.toastr.success('EL PERMISO HA SIDO APROBADO');
      } else if (est === 'R') {
        this.toastr.warning('EL PERMISO HA SIDO RECHAZADO');
      }
    });
  }
}
