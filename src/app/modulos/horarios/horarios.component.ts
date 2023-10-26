import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HorarioService } from 'src/app/services/horarios.service';
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

  fechaBusqueda: string = ''; // Agregar la propiedad fechaBusqueda
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

  constructor(private horarioService: HorarioService) { }

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

  editarHorario(horario: Horarios) {
    // Clona el horario para no modificar el original directamente
    const horarioEditado = { ...horario };
  
    // enviar una solicitud al servidor para actualizar el horario en la base de datos.
    this.horarioService.actualizarHorario(horario.horId, horarioEditado).subscribe(
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