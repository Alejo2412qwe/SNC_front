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
    });
  }
}