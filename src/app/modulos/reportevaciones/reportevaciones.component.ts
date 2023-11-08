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
    this.setActive()
    this.obtenerVacaciones();
    this.obtenerComision();
  }
/*
  agregarVacaciones() {
    this.vacacioneService.agregarVacaciones(this.nuevaVacacion).subscribe((response: any) => {
      this.nuevaVacacion = new Vacaciones(); // Reinicia el objeto nuevo registro después de agregar
      this.obtenerVacaciones();
    });
  }*/

  loadVacacionesByEstado(est: number) {
    this.vacacioneService.getVacacionesByEstado(est).subscribe((response) => {
      this.vacaciones = response; // Asigna los datos al array provincias
    });
  }

  agregarVacaciones() {
    this.vacacioneService.agregarVacaciones(this.nuevaVacacion).subscribe((data) => {
      this.loadVacacionesByEstado(this.estadoActivo);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: 'Horario agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  openCrearVacaciones() {
    Swal.fire({
      title: 'Crear Nuevo Estado Vacacion',
      html: `<div>
      <div class="input-container">
          <label for="name" class="name">Agregar Detalle:</label>
          <input placeholder="Ingresa el detalles de las vacaciones" type="text" class="input"
              name="vacDetalle" (keydown)="validarLetrasNum($event)"
              [(ngModel)]="nuevaVacacion.vacDetalle">
          <div class="underline"></div>
      </div>
  </div>

  <div>
      <div class="input-container">
          <label for="name" class="name">Agregar Dias:</label>
          <input placeholder="Ingrese el numero de dias de Vacaciones" type="text" class="input"
              name="vacDias" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevaVacacion.vacDias">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Agregar Horas:</label>
          <input placeholder="Ingrese las Horas" type="text" class="input"
              name="vacHoras" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevaVacacion.vacHoras">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Agregar Minutos:</label>
          <input placeholder="Ingrese los minutos" type="text" class="input"
              name="vacMinutos" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevaVacacion.vacMinutos">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Agregar Saldo:</label>
          <input placeholder="Ingrese el Saldo de Vacaciones" type="text" class="input"
              name="vacSaldo" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevaVacacion.vacSaldo">
          <div class="underline"></div>
      </div>
  </div>

  <div>
      <div class="input-container">
          <label for="name" class="name">Agregar Dias Ganados:</label>
          <input placeholder="Ingrese los dias ganados" type="text" class="input"
              name="vacDiasGanados" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevaVacacion.vacDiasGanados">
          <div class="underline"></div>
      </div>
  </div>

  <div>
      <div class="input-container">
          <label for="name" class="name">Agregar Dias no gozados:</label>
          <input placeholder="Ingrese los dias de vacaciones no gozadas" type="text" class="input"
              name="vacNoGozadas" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevaVacacion.vacNoGozadas">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Agregar Dias totales:</label>
          <input placeholder="Ingrese los dias de vacaciones totales" type="text" class="input"
              name="vacTotalenDias" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevaVacacion.vacTotalenDias">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Agregar Fechas:</label>
          <input placeholder="Ingrese la fecha de vacaciones" type="text" class="input"
              name="vacFecha" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevaVacacion.vacFecha">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Agregar la fecha del dia de hoy:</label>
          <input placeholder="Ingrese la fecha de hoy" type="text" class="input"
              name="vacFechaHoy" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevaVacacion.vacFechaHoy">
          <div class="underline"></div>
      </div>
  </div>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        // Utiliza Swal.getInput() para obtener los valores de entrada
        const inputvacDetalle = document.querySelector('input[name="vacDetalle"]') as HTMLInputElement;
        this.nuevaVacacion.vacDetalle = inputvacDetalle.value;
  
        const inputvacDias = document.querySelector('input[name="vacDias"]') as HTMLInputElement;
        this.nuevaVacacion.vacDias = inputvacDias.valueAsNumber;
  
        const inputvacHoras = document.querySelector('input[name="vacHoras"]') as HTMLInputElement;
        this.nuevaVacacion.vacHoras = inputvacHoras.valueAsNumber;
  
        const inputvacMinutos = document.querySelector('input[name="vacMinutos"]') as HTMLInputElement;
        this.nuevaVacacion.vacMinutos = inputvacMinutos.valueAsNumber;
  
        const inputvacSaldo = document.querySelector('input[name="vacSaldo"]') as HTMLInputElement;
        this.nuevaVacacion.vacSaldo = inputvacSaldo.valueAsNumber;

        const inputvacDiasGanados = document.querySelector('input[name="vacDiasGanados"]') as HTMLInputElement;
        this.nuevaVacacion.vacDiasGanados = inputvacDiasGanados.valueAsNumber;

        const inputvacNoGozadas = document.querySelector('input[name="vacNoGozadas"]') as HTMLInputElement;
        this.nuevaVacacion.vacNoGozadas = inputvacNoGozadas.valueAsNumber;

        const inputvacTotalenDias = document.querySelector('input[name="vacTotalenDias"]') as HTMLInputElement;
        this.nuevaVacacion.vacTotalenDias = inputvacTotalenDias.valueAsNumber;
/*
        const inputvacFecha = document.querySelector('input[name="vacFecha"]') as HTMLInputElement;
        this.nuevaVacacion.vacFecha = inputvacFecha.valueAsDate;

        const inputvacFechaHoy = document.querySelector('input[name="vacFechaHoy"]') as HTMLInputElement;
        this.nuevaVacacion.vacFechaHoy = inputvacFechaHoy.valueAsDate;
  */
        this.agregarVacaciones();
        this.loadVacacionesByEstado(this.estadoActivo);
      },
    });
  }

  setActive() {
    this.estList = 1; // Cambia el valor de estList a 1
  }

  eliminarVacaciones(vacaciones: Vacaciones) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.vacacioneService.eliminarVacaciones(vacaciones.vacId).subscribe((response: any) => {
        this.obtenerVacaciones(); // Vuelve a cargar la lista de registros después de eliminar uno
      });
    }
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

  obtenerVacaciones() {
    this.vacacioneService.getVacaciones().subscribe((response: Vacaciones[]) => {
      this.vacaciones = response; // Asigna la respuesta a la propiedad registros
    // Calcula el número de páginas basado en la longitud de registros (por ejemplo, 5 elementos por página)
    this.paginasVac = Array(Math.ceil(this.vacaciones.length / 5)).fill(0).map((x, i) => i);

    // También puedes establecer la página actual en la primera página
    this.paginaActualVac = 0;
  });
  }
  
  editarVacaciones(vacaciones: Vacaciones) {
    // Clona el registro para no modificar el original directamente
    const vacacionEditada = { ...vacaciones };
  
    // enviar una solicitud al servidor para actualizar el registro en la base de datos.
    this.vacacioneService.actualizarVacaciones(vacaciones.vacId, vacacionEditada).subscribe(
      (response: Vacaciones) => {
        // Maneja la respuesta exitosa, por ejemplo, actualizando la lista de registros.
        this.obtenerVacaciones();
      },
      (error: any) => {
        // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario.
        console.error('Ocurrió un error al actualizar el registro: ', error);
      }
    );
  }

  agregarComision() {
    this.comisionService.agregarComision(this.nuevaComision).subscribe((response: any) => {
      this.nuevaComision = new Comision(); // Reinicia el objeto nuevo registro después de agregar
      this.obtenerComision();
    });
  }


  eliminarComision(comision: Comision) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.comisionService.eliminarComision(comision.comId).subscribe((response: any) => {
        this.obtenerComision(); // Vuelve a cargar la lista de registros después de eliminar uno
      });
    }
  }

  obtenerComision() {
    this.comisionService.getComision().subscribe((response: Comision[]) => {
      this.comision = response; // Asigna la respuesta a la propiedad registros
    // Calcula el número de páginas basado en la longitud de registros (por ejemplo, 5 elementos por página)
    this.paginasCom = Array(Math.ceil(this.comision.length / 5)).fill(0).map((x, i) => i);

    // También puedes establecer la página actual en la primera página
    this.paginaActualCom = 0;
  });
  }

  buscarComisionPorFecha() {
    if (this.fechaBusquedaCom) {
      this.comisionService.buscarComision(this.fechaBusquedaCom).subscribe((response: Comision[]) => {
        this.comision = response;
      },
      (error: any) => {
        // Aquí manejas los errores, si ocurren
        console.error('Ocurrió un error: ', error);
      },
      () => {
        // Esta función se llama cuando la operación se completa (opcional)
        console.log('La operación se ha completado');
      }
    );
    }
  }

  editarComision(comision: Comision) {
    // Clona el registro para no modificar el original directamente
    const comisionEditada = { ...comision };
  
    // enviar una solicitud al servidor para actualizar el registro en la base de datos.
    this.comisionService.actualizarComision(comision.comId, comisionEditada).subscribe(
      (response: Comision) => {
        // Maneja la respuesta exitosa, por ejemplo, actualizando la lista de registros.
        this.obtenerComision();
      },
      (error: any) => {
        // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario.
        console.error('Ocurrió un error al actualizar el registro: ', error);
      }
    );
  }

  
  cambiarPaginaVac(pagina: number) {
    this.paginaActualVac = pagina;
  }

  cambiarPaginaCom(pagina: number) {
    this.paginaActualCom = pagina;
  }
}
