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
      const [horas] = hora.split(':').map(Number);
      return horas;
    };

    const horaSalidaDia = parseHora(horHoraSalidaDia);
    const horaIngresoTarde = parseHora(horHoraIngresoTarde);

    const diferenciaHoras = horaIngresoTarde - horaSalidaDia;

    return diferenciaHoras;
  }

  calcularDiferenciaDeHoras(horHoraIngresoDia: string, horHoraSalidaDia: string, horHoraIngresoTarde: string, horHoraSalidaTarde: string): number {
    const parseHora = (hora: string): number => {
      const [horas] = hora.split(':').map(Number);
      return horas;
    };

    const horaIngresoDia = parseHora(horHoraIngresoDia);
    const horaSalidaDia = parseHora(horHoraSalidaDia);
    const horaIngresoTarde = parseHora(horHoraIngresoTarde);
    let horaSalidaTarde = parseHora(horHoraSalidaTarde);

    if (horaSalidaTarde < horaIngresoTarde) {
      horaSalidaTarde += 24;
    }

    const diferenciaDia = horaSalidaDia - horaIngresoDia;
    const diferenciaTarde = horaSalidaTarde - horaIngresoTarde;
    const resultado = diferenciaDia + diferenciaTarde;

    return resultado;
  }

  openCrearHorario() {

    Swal.fire({
      title: 'Crear Nuevo Horario',
      html: `
      <div class="input-container">
      <label for="name" class="name">Hora de Ingreso En La Mañana:</label>
      <input style="padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          background-color: #f1f1f1;
          color: #777;
          width: 100%;
          outline: none;" placeholder="Enter your name" type="time" class="input" id="horHoraIngreso"
          [(ngModel)]="nuevoHorario.horHoraIngreso">
      <div class="underline"></div>
  </div>

  <div class="input-container">
  <label for="name" class="name">Hora de Salida En El Dia:</label>
  <input style="padding: 10px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      background-color: #f1f1f1;
      color: #777;
      width: 100%;
      outline: none;" placeholder="Enter your name" type="time" class="input" id="horHoraSalidaDia"
      [(ngModel)]="nuevoHorario.horHoraSalidaDia">
  <div class="underline"></div>
</div>   
    
<div class="input-container">
<label for="name" class="name">Hora de Ingreso En La Tarde:</label>
<input style="padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #f1f1f1;
    color: #777;
    width: 100%;
    outline: none;" placeholder="Enter your name" type="time" class="input" id="horHoraIngresoTarde"
    [(ngModel)]="nuevoHorario.horHoraIngresoTarde">
<div class="underline"></div>
</div>  

<div class="input-container">
<label for="name" class="name">Hora de Salida En La Tarde:</label>
<input style="padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #f1f1f1;
    color: #777;
    width: 100%;
    outline: none;" placeholder="Enter your name" type="time" class="input" id="horHoraSalidaTarde"
    [(ngModel)]="nuevoHorario.horHoraSalidaTarde">
<div class="underline"></div>
</div> 
`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {

        const selectHoraIngresoDia = document.getElementById('horHoraIngreso') as HTMLInputElement;
        const selectHoraSalidaDia = document.getElementById('horHoraSalidaDia') as HTMLInputElement;
        const selectHoraIngresoTarde = document.getElementById('horHoraIngresoTarde') as HTMLInputElement;
        const selectHoraSalidaTarde = document.getElementById('horHoraSalidaTarde') as HTMLInputElement;

        if (!selectHoraIngresoDia.value || !selectHoraSalidaDia.value || !selectHoraIngresoTarde.value || !selectHoraSalidaTarde.value) {

          Swal.showValidationMessage('Por favor, llene todos los campos.');

        } else if (selectHoraIngresoDia > selectHoraSalidaDia || selectHoraIngresoTarde > selectHoraSalidaTarde) {
          Swal.showValidationMessage('El horario de ingreso debe ser menor que el de salida tanto en la mañana como en la tarde.');
        } else {

          this.nuevoHorario.horHoraIngresoDia = selectHoraIngresoDia.value;
          this.nuevoHorario.horHoraSalidaDia = selectHoraSalidaDia.value;
          this.nuevoHorario.horHoraIngresoTarde = selectHoraIngresoTarde.value;
          this.nuevoHorario.horHoraSalidaTarde = selectHoraSalidaTarde.value;
          this.nuevoHorario.horNumHoras = this.calcularDiferenciaDeHoras(this.nuevoHorario.horHoraIngresoDia, this.nuevoHorario.horHoraSalidaDia,
            this.nuevoHorario.horHoraIngresoTarde, this.nuevoHorario.horHoraSalidaTarde);
          this.nuevoHorario.horHorasParaAlmuerzo = this.obtenerHorasAlmuerzo(this.nuevoHorario.horHoraSalidaDia, this.nuevoHorario.horHoraIngresoTarde)

          this.agregarHorario();
          this.loadHorariosByEstado(1);
        }
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

    this.horarioService.getHorarioById(id).subscribe((data) => {
      Swal.fire({
        title: 'Editar Horario',
        html: `
        <div class="input-container">
        <label for="name" class="name">Hora de Ingreso En La Mañana:</label>
        <input style="padding: 10px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            background-color: #f1f1f1;
            color: #777;
            width: 100%;
            outline: none;" placeholder="Enter your name" type="time" class="input" id="horHoraIngreso"
            [(ngModel)]="nuevoHorario.horHoraIngreso" value="${data.horHoraIngresoDia}">
        <div class="underline"></div>
    </div>
  
    <div class="input-container">
    <label for="name" class="name">Hora de Salida En El Dia:</label>
    <input style="padding: 10px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        background-color: #f1f1f1;
        color: #777;
        width: 100%;
        outline: none;" placeholder="Enter your name" type="time" class="input" id="horHoraSalidaDia"
        [(ngModel)]="nuevoHorario.horHoraSalidaDia" value="${data.horHoraSalidaDia}">
    <div class="underline"></div>
  </div>   
      
  <div class="input-container">
  <label for="name" class="name">Hora de Ingreso En La Tarde:</label>
  <input style="padding: 10px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      background-color: #f1f1f1;
      color: #777;
      width: 100%;
      outline: none;" placeholder="Enter your name" type="time" class="input" id="horHoraIngresoTarde"
      [(ngModel)]="nuevoHorario.horHoraIngresoTarde" value="${data.horHoraIngresoTarde}">
  <div class="underline"></div>
  </div>  
  
  <div class="input-container">
  <label for="name" class="name">Hora de Salida En La Tarde:</label>
  <input style="padding: 10px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      background-color: #f1f1f1;
      color: #777;
      width: 100%;
      outline: none;" placeholder="Enter your name" type="time" class="input" id="horHoraSalidaTarde"
      [(ngModel)]="nuevoHorario.horHoraSalidaTarde" value="${data.horHoraSalidaTarde}">
  <div class="underline"></div>
  </div> 
    `,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {

          const selectHoraIngresoDia = document.getElementById('horHoraIngreso') as HTMLInputElement;
          const selectHoraSalidaDia = document.getElementById('horHoraSalidaDia') as HTMLInputElement;
          const selectHoraIngresoTarde = document.getElementById('horHoraIngresoTarde') as HTMLInputElement;
          const selectHoraSalidaTarde = document.getElementById('horHoraSalidaTarde') as HTMLInputElement;

          if (!selectHoraIngresoDia.value || !selectHoraSalidaDia.value || !selectHoraIngresoTarde.value || !selectHoraSalidaTarde.value) {

            Swal.showValidationMessage('Por favor, llene todos los campos.');

          } else if (selectHoraIngresoDia >= selectHoraSalidaDia && selectHoraIngresoTarde >= selectHoraSalidaTarde) {
            Swal.showValidationMessage('El horario de ingreso debe ser menor que el de salida tanto en la mañana como en la tarde.');
          } else {

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
          }
        },
      });

    })

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
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} el horario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioService.updateEst(id, est).subscribe({
          next: () => {
            this.loadHorariosByEstado(1);
            if (est === 0) {
              this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
            } else {
              this.toastr.success('ACTIVADO CORRECTAMENTE', 'ÉXITO');
            }
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