import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HorarioService } from 'src/app/services/horarios.service';
import { ToastrService } from 'ngx-toastr';
import {
  validarLetras,
  validarNumeros,
  validarLetrasNum,
} from 'src/app/common/validaciones';
import { Horarios } from 'src/app/modelo/horario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  //LISTAS
  horarios: Horarios[] = []; // Utiliza el modelo Horario para definir el arreglo de horarios
 
  resultados: Horarios[]= []; // Propiedad para almacenar los resultados de la búsqueda


  //VARIABLES
  newProceso: string = '';
  newSubproceso: string = '';
  estadoActivo: number = 1;
  horaBusqueda: string = ''; // Propiedad para almacenar la hora de búsqueda

  nuevoHorario: Horarios = new Horarios(); // Utiliza el modelo Horario para definir el nuevoHorario

  /// RESTRICCION DE TECLAS
  validarLetras(event: KeyboardEvent) {
    validarLetras(event);
  }
  validarNumeros(event: KeyboardEvent) {
    validarNumeros(event);
  }
  validarLetrasNum(event: KeyboardEvent) {
    validarLetrasNum(event);
  }

  constructor(
    private horarioService: HorarioService,
    private toastr: ToastrService){}

  ngOnInit() {
    this.loadHorariosByEstado(this.estadoActivo);
  }

  /*
  agregarHorario() {
    this.horarioService.agregarHorario(this.nuevoHorario).subscribe((response: any) => {
      this.nuevoHorario = new Horarios(); // Reinicia el objeto nuevoHorario después de agregar
      this.obtenerHorarios();
    });
  }
*/
agregarHorario() {
    this.horarioService.agregarHorario(this.nuevoHorario).subscribe((data) => {
      this.loadHorariosByEstado(this.estadoActivo);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: 'Horario agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  openCrearHorario() {
    Swal.fire({
      title: 'Crear Nuevo Horario',
      html: `<div>
      <div class="input-container">
          <label for="name" class="name">Número de Horas:</label>
          <input placeholder="Ingresa el Número de horas totales al día" type="text" class="input"
              name="horNumHoras" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horNumHoras">
          <div class="underline"></div>
      </div>
  </div>

  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Ingreso:</label>
          <input placeholder="Ingrese su Hora de ingreso" type="text" class="input"
              name="horHoraIngreso" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horHoraIngreso">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Salida:</label>
          <input placeholder="Ingrese su Hora de salida" type="text" class="input"
              name="horHoraSalida" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horHoraSalida">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Inicio de Almuerzo:</label>
          <input placeholder="Ingrese la hora que comienza su Almuerzo" type="text" class="input"
              name="horHoraAlmuerzoInicio" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horHoraAlmuerzoInicio">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Fin de Almuerzo:</label>
          <input placeholder="Ingrese la hora que termina su Almuerzo" type="text" class="input"
              name="horHoraAlmuerzoFin" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horHoraAlmuerzoFin">
          <div class="underline"></div>
      </div>
  </div>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        // Utiliza Swal.getInput() para obtener los valores de entrada
        const inputNumHoras = document.querySelector('input[name="horNumHoras"]') as HTMLInputElement;
        this.nuevoHorario.horNumHoras = inputNumHoras.value;
  
        const inputHoraIngreso = document.querySelector('input[name="horHoraIngreso"]') as HTMLInputElement;
        this.nuevoHorario.horHoraIngreso = inputHoraIngreso.value;
  
        const inputHoraSalida = document.querySelector('input[name="horHoraSalida"]') as HTMLInputElement;
        this.nuevoHorario.horHoraSalida = inputHoraSalida.value;
  
        const inputHoraAlmuerzoInicio = document.querySelector('input[name="horHoraAlmuerzoInicio"]') as HTMLInputElement;
        this.nuevoHorario.horHoraAlmuerzoInicio = inputHoraAlmuerzoInicio.value;
  
        const inputHoraAlmuerzoFin = document.querySelector('input[name="horHoraAlmuerzoFin"]') as HTMLInputElement;
        this.nuevoHorario.horHoraAlmuerzoFin = inputHoraAlmuerzoFin.value;
  
        this.agregarHorario();
        this.loadHorariosByEstado(this.estadoActivo);
      },
    });
  }

  actualizarHorario(id: number) {
    this.horarioService.actualizaHorario(this.nuevoHorario, id).subscribe((data) => {
      this.loadHorariosByEstado(this.estadoActivo);
      Swal.fire({
        title: 'Edición Exitosa!',
        text: 'Horario agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  openUpdateProceso(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar Horario',
      html: `<div>
      <div class="input-container">
          <label for="name" class="name">Número de Horas:</label>
          <input placeholder="Ingresa el Número de horas totales al día" type="text" class="input"
              name="horNumHoras" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horNumHoras">
          <div class="underline"></div>
      </div>
  </div>

  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Ingreso:</label>
          <input placeholder="Ingrese su Hora de ingreso" type="text" class="input"
              name="horHoraIngreso" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horHoraIngreso">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Salida:</label>
          <input placeholder="Ingrese su Hora de salida" type="text" class="input"
              name="horHoraSalida" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horHoraSalida">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Inicio de Almuerzo:</label>
          <input placeholder="Ingrese la hora que comienza su Almuerzo" type="text" class="input"
              name="horHoraAlmuerzoInicio" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horHoraAlmuerzoInicio">
          <div class="underline"></div>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Fin de Almuerzo:</label>
          <input placeholder="Ingrese la hora que termina su Almuerzo" type="text" class="input"
              name="horHoraAlmuerzoFin" (keydown)="validarNumeros($event)"
              [(ngModel)]="nuevoHorario.horHoraAlmuerzoFin">
          <div class="underline"></div>
      </div>
  </div>`,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        // Utiliza Swal.getInput() para obtener los valores de entrada
        const inputNumHoras = document.querySelector('input[name="horNumHoras"]') as HTMLInputElement;
        this.nuevoHorario.horNumHoras = inputNumHoras.value;
  
        const inputHoraIngreso = document.querySelector('input[name="horHoraIngreso"]') as HTMLInputElement;
        this.nuevoHorario.horHoraIngreso = inputHoraIngreso.value;
  
        const inputHoraSalida = document.querySelector('input[name="horHoraSalida"]') as HTMLInputElement;
        this.nuevoHorario.horHoraSalida = inputHoraSalida.value;
  
        const inputHoraAlmuerzoInicio = document.querySelector('input[name="horHoraAlmuerzoInicio"]') as HTMLInputElement;
        this.nuevoHorario.horHoraAlmuerzoInicio = inputHoraAlmuerzoInicio.value;
  
        const inputHoraAlmuerzoFin = document.querySelector('input[name="horHoraAlmuerzoFin"]') as HTMLInputElement;
        this.nuevoHorario.horHoraAlmuerzoFin = inputHoraAlmuerzoFin.value;
        this.actualizarHorario(id);
        this.loadHorariosByEstado(this.estadoActivo);
      },
    });
  }

  obtenerHorarios() {
    this.horarioService.getHorarios().subscribe((response: Horarios[]) => {
      this.horarios = response; 
  });
  }

  buscarPorHora() {
    this.horarioService.buscarporHora(this.horaBusqueda).subscribe((horarios) => {
      this.horarios = horarios;
    });
  }

  /*
  actualizarHorario(horario: Horarios) {
    const confirmarEdicion = confirm('¿Estás seguro de que deseas editar este horario?');
    if (confirmarEdicion) {
        // Realiza una copia profunda del horario para no modificar el original directamente
        const horarioEditado = JSON.parse(JSON.stringify(horario));

        // Realiza validaciones aquí antes de enviar la solicitud al servidor

        // Envía la solicitud al servidor para actualizar el horario
        this.horarioService.actualizaHorario(horario.horId, horarioEditado).subscribe(
            (response: Horarios) => {
                // Maneja la respuesta exitosa, por ejemplo, actualizando la lista de horarios.
                this.obtenerHorarios();
            },
            (error: any) => {
                // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario.
                console.error('Ocurrió un error al actualizar el horario: ', error);
            }
        );
    }

}*/

loadHorariosByEstado(est: number) {
  this.horarioService.getHorariosByEstado(est).subscribe((response) => {
    this.horarios = response; // Asigna los datos al array provincias
  });
}

updateEstProceso(id: number, est: number) {
  Swal.fire({
    title: `Al eliminar el horario, se deshabilitará y no podra ser recuperado, ¿Està seguro de ello?`,
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
      this.horarioService.updateEst(id, est).subscribe({
        next: () => {
          this.loadHorariosByEstado(this.estadoActivo);
          this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
        },
        error: (error) => {
          // Manejar errores
        },
        complete: () => {},
      });
    } else if (result.isDenied) {
      this.loadHorariosByEstado(this.estadoActivo);
      this.toastr.warning('Acción Cancelada');
    }
  });
}

}