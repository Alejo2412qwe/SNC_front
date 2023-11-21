import { Component, OnInit } from '@angular/core';
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
  horaBusqueda: string = ''; // Propiedad para almacenar la hora de búsqueda

  nuevoHorario: Horarios = new Horarios(); // Utiliza el modelo Horario para definir el nuevoHorario

  constructor(
    private horarioService: HorarioService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadHorariosByEstado(1);
  }

  agregarHorario() {
    this.horarioService.agregarHorario(this.nuevoHorario).subscribe((data) => {
      this.loadHorariosByEstado(1);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: 'Horario agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  obtenerHorasAlmuerzo(horHoraSalidaDia: string, horHoraIngresoTarde: string): number {
    const parseHora = (hora: string): number => {
      const [horas, minutos] = hora.split(':').map(Number);
      return horas * 60 + minutos;
    };

    const horaSalidaDia = parseHora(horHoraSalidaDia);
    const horaIngresoTarde = parseHora(horHoraIngresoTarde);

    return horaIngresoTarde - horaSalidaDia;
  }

  calcularDiferenciaDeHoras(horHoraIngresoDia: string, horHoraSalidaDia: string, horHoraIngresoTarde: string, horHoraSalidaTarde: string): number {
    const parseHora = (hora: string): number => {
      const [horas, minutos] = hora.split(':').map(Number);
      return horas * 60 + minutos;
    };

    const horaIngresoDia = parseHora(horHoraIngresoDia);
    const horaSalidaDia = parseHora(horHoraSalidaDia);
    const horaIngresoTarde = parseHora(horHoraIngresoTarde);
    const horaSalidaTarde = parseHora(horHoraSalidaTarde);

    const diferenciaDia = horaSalidaDia - horaIngresoDia;
    const diferenciaTarde = horaSalidaTarde - horaIngresoTarde;
    const resultado = diferenciaDia + diferenciaTarde;

    return resultado;
  }

  openCrearHorario() {
    const horasDelDia = Array.from({ length: 24 }, (_, i) => i);
    const minutos = ['00', '15', '30', '45'];
    const opcionesCombo = horasDelDia.map(hora =>
      minutos.map(minuto => `<option value="${hora}:${minuto}">${hora}:${minuto}</option>`).join('')
    ).join('');

    Swal.fire({
      title: 'Crear Nuevo Horario',
      html: `
    <div>
        <div class="input-container">
            <label for="name" class="name">Hora de Ingreso En La Mañana:</label>
            <select class="input" name="horHoraIngresoDia" [(ngModel)]="nuevoHorario.horHoraIngreso">
              ${opcionesCombo}
            </select>
        </div>
    </div>
    
    <div>
        <div class="input-container">
            <label for="name" class="name">Hora de Salida En La Mañana:</label>
            <select class="input" name="horHoraSalidaDia" [(ngModel)]="nuevoHorario.horHoraSalida">
              ${opcionesCombo}
            </select>
        </div>
    </div>
    <div>
    <div class="input-container">
        <label for="name" class="name">Hora de Ingreso En La Tarde En La Tarde:</label>
        <select class="input" name="horHoraIngresoTarde" [(ngModel)]="nuevoHorario.horHoraSalida">
          ${opcionesCombo}
        </select>
    </div>
</div>

<div>
<div class="input-container">
    <label for="name" class="name">Hora de Salida En La Tarde:</label>
    <select class="input" name="horHoraSalidaTarde" [(ngModel)]="nuevoHorario.horHoraSalida">
      ${opcionesCombo}
    </select>
</div>
</div>
`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {

        const selectHoraIngresoDia = document.querySelector('select[name="horHoraIngresoDia"]') as HTMLSelectElement;
        const selectHoraSalidaDia = document.querySelector('select[name="horHoraSalidaDia"]') as HTMLSelectElement;
        const selectHoraIngresoTarde = document.querySelector('select[name="horHoraIngresoTarde"]') as HTMLSelectElement;
        const selectHoraSalidaTarde = document.querySelector('select[name="horHoraSalidaTarde"]') as HTMLSelectElement;

        const validateSelect = (select: HTMLSelectElement, label: string) => {
          if (select.value === '0:00') {
            Swal.showValidationMessage(`Selecciona una hora válida para ${label}.`);
            return false;
          }
          return true;
        };

        if (!validateSelect(selectHoraIngresoDia, 'Hora de Ingreso En El Dia') ||
          !validateSelect(selectHoraSalidaDia, 'Hora de Salida En El Dia') ||
          !validateSelect(selectHoraIngresoTarde, 'Hora de Salida En La Tarde') ||
          !validateSelect(selectHoraSalidaTarde, 'Hora de Salida En La Tarde')

        ) {
          return;
        }

        // Si todas las validaciones pasan, procede con la lógica de agregar horario
        this.nuevoHorario.horHoraIngresoDia = selectHoraIngresoDia.value;
        this.nuevoHorario.horHoraSalidaDia = selectHoraSalidaDia.value;
        this.nuevoHorario.horHoraIngresoTarde = selectHoraIngresoTarde.value;
        this.nuevoHorario.horHoraSalidaTarde = selectHoraSalidaTarde.value;
        this.nuevoHorario.horNumHoras = this.calcularDiferenciaDeHoras(this.nuevoHorario.horHoraIngresoDia, this.nuevoHorario.horHoraSalidaDia,
          this.nuevoHorario.horHoraIngresoTarde, this.nuevoHorario.horHoraSalidaTarde);
        this.nuevoHorario.horHorasParaAlmuerzo = this.obtenerHorasAlmuerzo(this.nuevoHorario.horHoraSalidaDia, this.nuevoHorario.horHoraIngresoTarde)

        this.agregarHorario();
        this.loadHorariosByEstado(1);
      },
    });
  }





  actualizarHorario(id: number) {
    this.horarioService.actualizaHorario(this.nuevoHorario, id).subscribe((data) => {
      this.loadHorariosByEstado(1);
      Swal.fire({
        title: 'Edición Exitosa!',
        text: 'Horario agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  openUpdateProceso(id: number) {
    const horasDelDia = Array.from({ length: 24 }, (_, i) => i);
    const minutos = ['00', '15', '30', '45'];
    const opcionesCombo = horasDelDia.map(hora =>
      minutos.map(minuto => `<option value="${hora}:${minuto}">${hora}:${minuto}</option>`).join('')
    ).join('');

    Swal.fire({
      title: 'Editar Horario',
      html: `
      <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Ingreso En La Mañana:</label>
          <select class="input" id="horHoraIngresoDia">
            ${opcionesCombo}
          </select>
      </div>
  </div>
  
  <div>
      <div class="input-container">
          <label for="name" class="name">Hora de Salida En La Mañana:</label>
          <select class="input" id="horHoraSalidaDia">
            ${opcionesCombo}
          </select>
      </div>
  </div>
  <div>
  <div class="input-container">
      <label for="name" class="name">Hora de Ingreso En La Tarde En La Tarde:</label>
      <select class="input" id="horHoraIngresoTarde">
        ${opcionesCombo}
      </select>
  </div>
</div>

<div>
<div class="input-container">
  <label for="name" class="name">Hora de Salida En La Tarde:</label>
  <select class="input" id="horHoraSalidaTarde">
    ${opcionesCombo}
  </select>
</div>
</div>
  `,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const selectHoraIngresoDia = document.getElementById('horHoraIngresoDia') as HTMLSelectElement;
        const selectHoraSalidaDia = document.getElementById('horHoraSalidaDia') as HTMLSelectElement;
        const selectHoraIngresoTarde = document.getElementById('horHoraIngresoTarde') as HTMLSelectElement;
        const selectHoraSalidaTarde = document.getElementById('horHoraSalidaTarde') as HTMLSelectElement;

        const validateSelect = (select: HTMLSelectElement, label: string) => {
          if (select.value === '0:00') {
            Swal.showValidationMessage(`Selecciona una hora válida para ${label}.`);
            return false;
          }
          return true;
        };

        if (!validateSelect(selectHoraIngresoDia, 'Hora de Ingreso En El Dia') ||
          !validateSelect(selectHoraSalidaDia, 'Hora de Salida En El Dia') ||
          !validateSelect(selectHoraIngresoTarde, 'Hora de Salida En La Tarde') ||
          !validateSelect(selectHoraSalidaTarde, 'Hora de Salida En La Tarde')

        ) {
          return;
        }

        // Si todas las validaciones pasan, procede con la lógica de agregar horario
        this.nuevoHorario.horHoraIngresoDia = selectHoraIngresoDia.value;
        this.nuevoHorario.horHoraSalidaDia = selectHoraSalidaDia.value;
        this.nuevoHorario.horHoraIngresoTarde = selectHoraIngresoTarde.value;
        this.nuevoHorario.horHoraSalidaTarde = selectHoraSalidaTarde.value;
        this.nuevoHorario.horNumHoras = this.calcularDiferenciaDeHoras(this.nuevoHorario.horHoraIngresoDia, this.nuevoHorario.horHoraSalidaDia,
          this.nuevoHorario.horHoraIngresoTarde, this.nuevoHorario.horHoraSalidaTarde);
        this.nuevoHorario.horHorasParaAlmuerzo = this.obtenerHorasAlmuerzo(this.nuevoHorario.horHoraSalidaDia, this.nuevoHorario.horHoraIngresoTarde)

        this.actualizarHorario(id);
        this.loadHorariosByEstado(1);
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
            this.loadHorariosByEstado(1);
            this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => { },
        });
      } else if (result.isDenied) {
        this.loadHorariosByEstado(1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

}