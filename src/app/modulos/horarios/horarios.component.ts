import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Horarios } from 'src/app/modelo/horario';
import { HorarioService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  nuevoHorario: Horarios = new Horarios(); // Utiliza el modelo Horario para definir el nuevoHorario
  horarios: Horarios[] = []; // Utiliza el modelo Horario para definir el arreglo de horarios
  paginaActual: number = 0; // Define la propiedad paginaActual y establece un valor inicial
  paginas: number[] = []; 

  fechaBusqueda: string = ''; // Agregar la propiedad fechaBusqueda


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
      this.horarios = response; // Asigna la respuesta a la propiedad horarios
    // Calcula el número de páginas basado en la longitud de horarios (por ejemplo, 5 elementos por página)
    this.paginas = Array(Math.ceil(this.horarios.length / 5)).fill(0).map((x, i) => i);

    // También puedes establecer la página actual en la primera página
    this.paginaActual = 0;
  });
  }

  buscarPorFecha() {
    if (this.fechaBusqueda) {
      this.horarioService.buscarHorarios(this.fechaBusqueda).subscribe((response: Horarios[]) => {
        this.horarios = response;
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

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
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