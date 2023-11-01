import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Vacaciones } from 'src/app/modelo/vacaciones';
import { Comision } from 'src/app/modelo/comision';
import { VacacionesService } from 'src/app/services/vacaciones.service';
import { ComisionService } from 'src/app/services/comision.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reportevaciones',
  templateUrl: './reportevaciones.component.html',
  styleUrls: ['./reportevaciones.component.css']
})
export class VacacionesComponent implements OnInit {
  nuevaVacacion: Vacaciones = new Vacaciones(); // Utiliza el modelo registro para definir el nuevoregistro
  nuevaComision: Comision = new Comision(); 
  vacaciones: Vacaciones[] = []; // Utiliza el modelo registro para definir el arreglo de registros
  comision: Comision[] = [];
  paginaActualVac: number = 0; // Define la propiedad paginaActual y establece un valor inicial
  paginasVac: number[] = []; 
  paginaActualCom: number = 0; // Define la propiedad paginaActual y establece un valor inicial
  paginasCom: number[] = [];
  estList: number = 1

  fechaBusquedaVac: string = ''; // Agregar la propiedad fechaBusqueda
  fechaBusquedaCom: string = ''; 

  constructor(private vacacioneService: VacacionesService, private comisionService: ComisionService, private toastr: ToastrService, private sessionStorage: SessionStorageService) {
    this.estList = 1;
  }

  ngOnInit(): void {
    this.setActive()
    this.obtenerVacaciones();
    this.obtenerComision();
  }

  agregarVacaciones() {
    this.vacacioneService.agregarVacaciones(this.nuevaVacacion).subscribe((response: any) => {
      this.nuevaVacacion = new Vacaciones(); // Reinicia el objeto nuevo registro después de agregar
      this.obtenerVacaciones();
    });
  }

  setActive() {
    this.estList = 1; // Cambia el valor de estList a 1
  }

  eliminarVacaciones(vacaciones: Vacaciones) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.vacacioneService.eliminarVacaciones(vacaciones.vacId).subscribe((response: any) => {
        this.obtenerVacaciones(); // Vuelve a cargar la lista de registros después de eliminar uno
      });
    }
  }

  loadVac(est: number) {
    this.vacacioneService.allVacData(est).subscribe((response) => {
      this.vacaciones = response; // Asigna los datos al array provincias
    });
  }

  updateEstVac(id: number, est: number) {
    this.vacacioneService.updateEst(id, est).subscribe({
      next: () => {
        console.log('eliminado')
        this.loadVac(1)
      },
      error: (error) => {
        // Manejar errores
      },
      complete: () => {
        // Manejar completado
      }
    });

  }

  obtenerVacaciones() {
    this.vacacioneService.getVacaciones().subscribe((response: Vacaciones[]) => {
      this.vacaciones = response; // Asigna la respuesta a la propiedad registros
    // Calcula el número de páginas basado en la longitud de registros (por ejemplo, 5 elementos por página)
    this.paginasVac = Array(Math.ceil(this.vacaciones.length / 5)).fill(0).map((x, i) => i);

    // También puedes establecer la página actual en la primera página
    this.paginaActualVac = 0;
  });
  }

  buscarVacacionesPorFecha() {
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

  agregarComision() {
    this.comisionService.agregarComision(this.nuevaComision).subscribe((response: any) => {
      this.nuevaComision = new Comision(); // Reinicia el objeto nuevo registro después de agregar
      this.obtenerComision();
    });
  }


  eliminarComision(comision: Comision) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.comisionService.eliminarComision(comision.comId).subscribe((response: any) => {
        this.obtenerComision(); // Vuelve a cargar la lista de registros después de eliminar uno
      });
    }
  }

  obtenerComision() {
    this.comisionService.getComision().subscribe((response: Comision[]) => {
      this.comision = response; // Asigna la respuesta a la propiedad registros
    // Calcula el número de páginas basado en la longitud de registros (por ejemplo, 5 elementos por página)
    this.paginasCom = Array(Math.ceil(this.comision.length / 5)).fill(0).map((x, i) => i);

    // También puedes establecer la página actual en la primera página
    this.paginaActualCom = 0;
  });
  }

  buscarComisionPorFecha() {
    if (this.fechaBusquedaCom) {
      this.comisionService.buscarComision(this.fechaBusquedaCom).subscribe((response: Comision[]) => {
        this.comision = response;
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

  editarComision(comision: Comision) {
    // Clona el registro para no modificar el original directamente
    const comisionEditada = { ...comision };
  
    // enviar una solicitud al servidor para actualizar el registro en la base de datos.
    this.comisionService.actualizarComision(comision.comId, comisionEditada).subscribe(
      (response: Comision) => {
        // Maneja la respuesta exitosa, por ejemplo, actualizando la lista de registros.
        this.obtenerComision();
      },
      (error: any) => {
        // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario.
        console.error('Ocurrió un error al actualizar el registro: ', error);
      }
    );
  }

}
