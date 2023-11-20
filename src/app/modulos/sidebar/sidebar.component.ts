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
    const elementosAdmin = ['personal', 'verper', 'valor', 'otrasfun', 'aprobarpermisos', 'tipopermiso', 'tipoformulario', 'procesos',
      'ingresarpro', 'Instituciones', 'ingresarinst', 'funciones', 'ingresarfun', 'zonales', 'verzonales', 'horarios', 'periodo'];

    const rolAdmin = ['Administrador'];
    const rolJefeUnidad = ['Jefe de Unidad'];

    const mostrarElementoAdmin = rolAdmin.includes(this.rol);
    const mostrarElementoJefeUnidad = rolJefeUnidad.includes(this.rol);

    for (const elementoId of elementosAdmin) {
      const elemento = document.getElementById(elementoId);
      if (elemento) {
        elemento.style.display = mostrarElementoAdmin || (mostrarElementoJefeUnidad && elementoId === 'aprobarpermisos') ? 'block' : 'none';
      }
    }
  }

}

