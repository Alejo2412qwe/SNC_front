import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HorarioService } from 'src/app/services/horarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  nuevoHorario: Horarios = new Horarios(); // Utiliza el modelo Horario para definir el nuevoHorario
  horarios: Horarios[] = []; // Utiliza el modelo Horario para definir el arreglo de horarios
 
  resultados: Horarios[]= []; // Propiedad para almacenar los resultados de la búsqueda


  //VARIABLES
  newProceso: string = '';
  newSubproceso: string = '';
  estadoActivo: number = 1;
  horaBusqueda: string = ''; // Propiedad para almacenar la hora de búsqueda

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

  constructor(private horarioService: HorarioService){}

  ngOnInit() {
    this.obtenerHorarios();
  }

  agregarHorario() {
    this.horarioService.agregarHorario(this.nuevoHorario).subscribe((response: any) => {
      this.nuevoHorario = new Horarios(); // Reinicia el objeto nuevoHorario después de agregar
      this.obtenerHorarios();
    });
  }


  eliminarHorario(horario: Horarios) {
    if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      this.horarioService.eliminarHorario(horario.horId).subscribe((response: any) => {
        this.obtenerHorarios(); // Vuelve a cargar la lista de horarios después de eliminar uno
      });
    }
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

}

loadProcesosByEstado(est: number) {
  this.horarioService.getProcesosByEstado(est).subscribe((response) => {
    this.listaProcesos = response; // Asigna los datos al array provincias
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
          this.loadProcesosByEstado(this.estadoActivo);
          this.loadSubprocesosByProcEstado(1, 1);
          this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
        },
        error: (error) => {
          // Manejar errores
        },
        complete: () => {},
      });
    } else if (result.isDenied) {
      this.loadProcesosByEstado(this.estadoActivo);
      this.loadSubprocesosByProcEstado(
        this.estadoActivo,
        this.subproceso.subEstado
      );
      this.toastr.warning('Acción Cancelada');
    }
  });
}

}