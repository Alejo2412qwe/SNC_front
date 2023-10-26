import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Vacaciones } from 'src/app/modelo/vacaciones';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-reportevaciones',
  templateUrl: './reportevaciones.component.html',
  styleUrls: ['./reportevaciones.component.css']
})
export class VacacionesComponent implements OnInit {
  nuevaVacacion: Vacaciones = new Vacaciones(); // Utiliza el modelo registro para definir el nuevoregistro
  vacaciones: Vacaciones[] = []; // Utiliza el modelo registro para definir el arreglo de registros
  paginaActual: number = 0; // Define la propiedad paginaActual y establece un valor inicial
  paginas: number[] = []; 

  fechaBusquedaVac: string = ''; // Agregar la propiedad fechaBusqueda

  constructor(private vacacioneService: VacacionesService) {}

  ngOnInit(): void {
    this.obtenerVacaciones();
  }

  agregarVacaciones() {
    this.vacacioneService.agregarVacaciones(this.nuevaVacacion).subscribe((response: any) => {
      this.nuevaVacacion = new Vacaciones(); // Reinicia el objeto nuevo registro después de agregar
      this.obtenerVacaciones();
    });
  }


  eliminarVacaciones(vacaciones: Vacaciones) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.vacacioneService.eliminarVacaciones(vacaciones.vacId).subscribe((response: any) => {
        this.obtenerVacaciones(); // Vuelve a cargar la lista de registros después de eliminar uno
      });
    }
  }

  obtenerVacaciones() {
    this.vacacioneService.getVacaciones().subscribe((response: Vacaciones[]) => {
      this.vacaciones = response; // Asigna la respuesta a la propiedad registros
    // Calcula el número de páginas basado en la longitud de registros (por ejemplo, 5 elementos por página)
    this.paginas = Array(Math.ceil(this.vacaciones.length / 5)).fill(0).map((x, i) => i);

    // También puedes establecer la página actual en la primera página
    this.paginaActual = 0;
  });
  }

  buscarPorFecha() {
    if (this.fechaBusquedaVac) {
      this.vacacioneService.buscarVacaciones(this.fechaBusquedaVac).subscribe((response: Vacaciones[]) => {
        this.vacaciones = response;
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
}
