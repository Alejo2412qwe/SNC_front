import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Vacaciones } from 'src/app/modelo/vacaciones';
import { Comision } from 'src/app/modelo/comision';
import { VacacionesService } from 'src/app/services/vacaciones.service';
import { ComisionService } from 'src/app/services/comision.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';
import {
  validarLetras,
  validarNumeros,
  validarLetrasNum,
} from 'src/app/common/validaciones';

@Component({
  selector: 'app-reportevaciones',
  templateUrl: './reportevaciones.component.html',
  styleUrls: ['./reportevaciones.component.css']
})
export class VacacionesComponent implements OnInit {
  nuevaVacacion: Vacaciones = new Vacaciones(); // Utiliza el modelo registro para definir el nuevoregistro
  nuevaComision: Comision = new Comision();
  vacaciones: Vacaciones[] = []; // Utiliza el modelo registro para definir el arreglo de registros
  comision: Comision[] = [];
  paginaActualVac: number = 0; // Define la propiedad paginaActual y establece un valor inicial
  paginasVac: number[] = [];
  paginaActualCom: number = 0; // Define la propiedad paginaActual y establece un valor inicial
  paginasCom: number[] = [];
  estList: number = 1;
  estadoActivo: number = 1;
  vacacion = this.sessionStorage.getItem('vacacion');
  periodo = this.sessionStorage.getItem('periodo');
  searchString: string = '';

  fechaBusquedaVac: string = ''; // Agregar la propiedad fechaBusqueda
  fechaBusquedaCom: string = '';

  constructor(private vacacioneService: VacacionesService, private comisionService: ComisionService, private toastr: ToastrService, private sessionStorage: SessionStorageService) {
    this.estList = 1;
  }

  ngOnInit(): void {
    this.loadVacacionesByEstado(1);
  }

  loadVacacionesByEstado(est: number) {
    this.vacacioneService.getVacacionesByEstado(est).subscribe((response) => {
      this.vacaciones = response; // Asigna los datos al array provincias
    });
  }

  loadVac(est: number) {
    this.vacacioneService.allVacData(est).subscribe((response) => {
      this.vacaciones = response; // Asigna los datos al array provincias
    });
  }

  updateEstVac(id: number, est: number) {
    this.vacacioneService.updateEst(id, est).subscribe({
      next: () => {
        console.log('eliminado')
        this.loadVac(1)
      },
      error: (error) => {
        // Manejar errores
      },
      complete: () => {
        // Manejar completado
      }
    });

  }

  searchVac(search: string, est: number) {
    this.vacacioneService.searchVacacionesData(search, est).subscribe((response) => {
      this.vacaciones = response; // Asigna los datos al array provincias
    });
  }

  editarVacaciones(vacaciones: Vacaciones) {
    // Clona el registro para no modificar el original directamente
    const vacacionEditada = { ...vacaciones };
  
    // enviar una solicitud al servidor para actualizar el registro en la base de datos.
    this.vacacioneService.actualizarVacaciones(vacaciones.vacId, vacacionEditada).subscribe(
      (response: Vacaciones) => {
        // Maneja la respuesta exitosa, por ejemplo, actualizando la lista de registros.
        this.loadVacacionesByEstado(1);
      },
      (error: any) => {
        // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario.
        console.error('Ocurrió un error al actualizar el registro: ', error);
      }
    );
  }

}
