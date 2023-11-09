import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.mostrarOpciones();
  }

  username = this.sessionStorage.getItem('username');
  rol: string = this.sessionStorage.getItem('rol') || '';


  mostrarOpciones() {
    const elementos = ['personal', 'verper', 'valor', 'otrasfun',
      'ingresarasistencia', 'aprobarpermisos', 'tipopermiso', 'tipoformulario', 'procesos',
      'ingresarpro', 'Instituciones', 'ingresarinst', 'funciones', 'ingresarfun'];

    const rolesPermitidos = ['Administrador'];

    const mostrarElemento = rolesPermitidos.includes(this.rol);

    for (const elementoId of elementos) {
      const elemento = document.getElementById(elementoId);

      if (elemento) {
        elemento.style.display = mostrarElemento ? 'block' : 'none';
      }
    }
  }

}
