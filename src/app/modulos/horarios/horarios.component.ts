import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HorarioService } from 'src/app/services/horarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  validarLetras,
  validarNumeros,
  validarLetrasNum,
} from 'src/app/common/validaciones';
import { Horarios } from 'src/app/modelo/horario';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  nuevoHorario: Horarios = new Horarios(); // Utiliza el modelo Horario para definir el nuevoHorario
  horarios: Horarios[] = []; // Utiliza el modelo Horario para definir el arreglo de horarios
 
  resultados: Horarios[]= []; // Propiedad para almacenar los resultados de la búsqueda

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

}