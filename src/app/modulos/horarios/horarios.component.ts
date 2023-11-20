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

  resultados: Horarios[] = []; // Propiedad para almacenar los resultados de la búsqueda


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
    private toastr: ToastrService) { }

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
    const horasDelDia = Array.from({ length: 24 }, (_, i) => i);
    const minutos = ['00', '15', '30', '45'];
    const opcionesCombo = horasDelDia.map(hora =>
      minutos.map(minuto => `<option value="${hora}:${minuto}">${hora}:${minuto}</option>`).join('')
    ).join('');

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
            <select class="input" name="horHoraIngreso" [(ngModel)]="nuevoHorario.horHoraIngreso">
              ${opcionesCombo}
            </select>
        </div>
    </div>
    
    <div>
        <div class="input-container">
            <label for="name" class="name">Hora de Salida:</label>
            <select class="input" name="horHoraSalida" [(ngModel)]="nuevoHorario.horHoraSalida">
              ${opcionesCombo}
            </select>
        </div>
    </div>
    
    <div>
        <div class="input-container">
            <label for="name" class="name">Hora de Inicio de Almuerzo:</label>
            <select class="input" name="horHoraAlmuerzoInicio" [(ngModel)]="nuevoHorario.horHoraAlmuerzoInicio">
              ${opcionesCombo}
            </select>
        </div>
    </div>
    
    <div>
        <div class="input-container">
            <label for="name" class="name">Hora de Fin de Almuerzo:</label>
            <select class="input" name="horHoraAlmuerzoFin" [(ngModel)]="nuevoHorario.horHoraAlmuerzoFin">
              ${opcionesCombo}
            </select>
        </div>
    </div>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {

        const inputNumHoras = document.querySelector('input[name="horNumHoras"]') as HTMLInputElement;
        const selectHoraIngreso = document.querySelector('select[name="horHoraIngreso"]') as HTMLSelectElement;
        const selectHoraSalida = document.querySelector('select[name="horHoraSalida"]') as HTMLSelectElement;
        const selectHoraAlmuerzoInicio = document.querySelector('select[name="horHoraAlmuerzoInicio"]') as HTMLSelectElement;
        const selectHoraAlmuerzoFin = document.querySelector('select[name="horHoraAlmuerzoFin"]') as HTMLSelectElement;
  
        // Realizar las validaciones
        if (!inputNumHoras.value || inputNumHoras.value.trim() === '' || inputNumHoras.value === '0') {
          Swal.showValidationMessage('Ingresa un número de horas válido.');
          return;
        }
  
        const validateSelect = (select: HTMLSelectElement, label: string) => {
          if (select.value === '0:00') {
            Swal.showValidationMessage(`Selecciona una hora válida para ${label}.`);
            return false;
          }
          return true;
        };
  
        if (!validateSelect(selectHoraIngreso, 'Hora de Ingreso') ||
            !validateSelect(selectHoraSalida, 'Hora de Salida') ||
            !validateSelect(selectHoraAlmuerzoInicio, 'Hora de Inicio de Almuerzo') ||
            !validateSelect(selectHoraAlmuerzoFin, 'Hora de Fin de Almuerzo')) {
          return;
        }
  
        // Si todas las validaciones pasan, procede con la lógica de agregar horario
        this.nuevoHorario.horNumHoras = inputNumHoras.value;
        this.nuevoHorario.horHoraIngreso = selectHoraIngreso.value;
        this.nuevoHorario.horHoraSalida = selectHoraSalida.value;
        this.nuevoHorario.horHoraAlmuerzoInicio = selectHoraAlmuerzoInicio.value;
        this.nuevoHorario.horHoraAlmuerzoFin = selectHoraAlmuerzoFin.value;

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
    const horasDelDia = Array.from({ length: 24 }, (_, i) => i);
    const minutos = ['00', '15', '30', '45'];
    const opcionesCombo = horasDelDia.map(hora =>
      minutos.map(minuto => `<option value="${hora}:${minuto}">${hora}:${minuto}</option>`).join('')
    ).join('');

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
          <select class="input" name="horHoraIngreso" [(ngModel)]="nuevoHorario.horHoraIngreso">
            ${opcionesCombo}
          </select>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Salida:</label>
          <select class="input" name="horHoraSalida" [(ngModel)]="nuevoHorario.horHoraSalida">
            ${opcionesCombo}
          </select>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Inicio de Almuerzo:</label>
          <select class="input" name="horHoraAlmuerzoInicio" [(ngModel)]="nuevoHorario.horHoraAlmuerzoInicio">
            ${opcionesCombo}
          </select>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Fin de Almuerzo:</label>
          <select class="input" name="horHoraAlmuerzoFin" [(ngModel)]="nuevoHorario.horHoraAlmuerzoFin">
            ${opcionesCombo}
          </select>
      </div>
  </div>`,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        // Utiliza Swal.getInput() para obtener los valores de entrada
        const inputNumHoras = document.querySelector('input[name="horNumHoras"]') as HTMLInputElement;
        const selectHoraIngreso = document.querySelector('select[name="horHoraIngreso"]') as HTMLSelectElement;
        const selectHoraSalida = document.querySelector('select[name="horHoraSalida"]') as HTMLSelectElement;
        const selectHoraAlmuerzoInicio = document.querySelector('select[name="horHoraAlmuerzoInicio"]') as HTMLSelectElement;
        const selectHoraAlmuerzoFin = document.querySelector('select[name="horHoraAlmuerzoFin"]') as HTMLSelectElement;

        // Realizar las validaciones
        if (!inputNumHoras.value || inputNumHoras.value.trim() === '' || inputNumHoras.value === '0') {
          Swal.showValidationMessage('Ingresa un número de horas válido.');
          return;
        }

        const validateSelect = (select: HTMLSelectElement, label: string) => {
          if (select.value === '0:00') {
            Swal.showValidationMessage(`Selecciona una hora válida para ${label}.`);
            return false;
          }
          return true;
        };
        
        if (!validateSelect(selectHoraIngreso, 'Hora de Ingreso') ||
          !validateSelect(selectHoraSalida, 'Hora de Salida') ||
          !validateSelect(selectHoraAlmuerzoInicio, 'Hora de Inicio de Almuerzo') ||
          !validateSelect(selectHoraAlmuerzoFin, 'Hora de Fin de Almuerzo')) {
          return;
        }

        // Si todas las validaciones pasan, procede con la lógica de actualizar horario
        this.nuevoHorario.horNumHoras = inputNumHoras.value;
        this.nuevoHorario.horHoraIngreso = selectHoraIngreso.value;
        this.nuevoHorario.horHoraSalida = selectHoraSalida.value;
        this.nuevoHorario.horHoraAlmuerzoInicio = selectHoraAlmuerzoInicio.value;
        this.nuevoHorario.horHoraAlmuerzoFin = selectHoraAlmuerzoFin.value;
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
    const valorInput = this.horaBusqueda;

    if (valorInput.trim() === '') {
      // El campo está vacío, puedes mostrar un mensaje o realizar alguna acción adicional
      console.log('El campo de búsqueda está vacío. No se realizará la búsqueda.');
      return;
    }

    this.horarioService.buscarporHora(this.horaBusqueda).subscribe((horarios) => {
      this.horarios = horarios;
    });
  }
  

  loadHorariosByEstado(est: number) {
    this.horarioService.getHorariosByEstado(est).subscribe((response) => {
      this.horarios = response;
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
          complete: () => { },
        });
      } else if (result.isDenied) {
        this.loadHorariosByEstado(this.estadoActivo);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

}