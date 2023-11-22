import { Component, OnInit } from '@angular/core';
import { Vacaciones } from 'src/app/modelo/vacaciones';
import { Comision } from 'src/app/modelo/comision';
import { VacacionesService } from 'src/app/services/vacaciones.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';


@Component({
  selector: 'app-reportevaciones',
  templateUrl: './reportevaciones.component.html',
  styleUrls: ['./reportevaciones.component.css']
})
export class VacacionesComponent implements OnInit {
  nuevaVacacion: Vacaciones = new Vacaciones(); // Utiliza el modelo registro para definir el nuevoregistro
  nuevaComision: Comision = new Comision();
  listaVacaciones: Vacaciones[] = []; // Utiliza el modelo registro para definir el arreglo de registros
  comision: Comision[] = [];
  paginaActualVac: number = 0; // Define la propiedad paginaActual y establece un valor inicial
  paginasVac: number[] = [];
  paginaActualCom: number = 0; // Define la propiedad paginaActual y establece un valor inicial
  paginasCom: number[] = [];
  estList: number = 1;
  estadoActivo: number = 1;
  vacacion = this.sessionStorage.getItem('vacacion');
  periodo = this.sessionStorage.getItem('periodo');
  searchString: string = '';

  fechaBusquedaVac: string = ''; // Agregar la propiedad fechaBusqueda
  fechaBusquedaCom: string = '';

  constructor(private vacacioneService: VacacionesService,
    private sessionStorage: SessionStorageService,
    private usuarioService: UsuarioService) {

  }

  idUsuario: number = this.sessionStorage.getItem('userId') || 0;
  rol = this.sessionStorage.getItem('rol');

  ngOnInit(): void {
    this.sumarDiasSegunRegimen(this.idUsuario);
    this.getFilterVacaciones();
  }

  getFilterVacaciones() {
    if (this.rol === 'Administrador') {
      this.getVacaciones();
    } else {
      this.getVacacionesByUsuId(this.sessionStorage.getItem('userId') || 0);
    }
  }

  getVacacionesByUsuId(id: number) {
    this.vacacioneService.getVacacionesByUsuId(id).subscribe((response) => {
      this.listaVacaciones = response; // Asigna los datos al array provincias
    });
  }

  getVacaciones() {
    this.vacacioneService.getVacaciones().subscribe((data) => {
      this.listaVacaciones = data
    })
  }

  sumarDiasSegunRegimen(id: number) {
    this.usuarioService.searchUsersId(id).pipe(
      tap((data) => {
        let saldo: number = 0;
        const mesesDesdeRegistro = this.calcularMesesDesdeRegistro(data.usuFechaRegistro);

        if (data.regId.regId === 1) {
          saldo += 2.5 * mesesDesdeRegistro;
        } else if (data.regId.regId === 2) {
          if (mesesDesdeRegistro < 60) {
            saldo += 1.25 * mesesDesdeRegistro;
          } else {
            saldo += this.sumarDiasAntiguedad(mesesDesdeRegistro - 60);
          }
        }

        // Actualiza el saldo
        this.usuarioService.updateSaldo(id, saldo).subscribe(() => {
          console.log(saldo)
        });
      })
    ).subscribe();
  }

  private calcularMesesDesdeRegistro(fechaRegistro: Date | string): number {
    // Intenta crear una instancia de Date desde la cadena si no es una instancia ya
    const fechaRegistroObj = fechaRegistro instanceof Date ? fechaRegistro : new Date(fechaRegistro);

    // Verifica si la fecha es válida
    if (isNaN(fechaRegistroObj.getTime())) {
      console.error('Fecha de registro no válida');
      return 0; // O algún valor por defecto
    }

    const hoy = new Date();
    const diferenciaEnMeses = (hoy.getFullYear() - fechaRegistroObj.getFullYear()) * 12 +
      hoy.getMonth() - fechaRegistroObj.getMonth();

    return diferenciaEnMeses;
  }

  private sumarDiasAntiguedad(mesesAntiguedad: number): number {
    // Definir la tabla de sumatoria según la antigüedad
    const tablaSumatoria = [1.33, 1.416, 1.5, 1.583, 1.6, 1.75, 1.83, 1.9, 2, 2.083];

    // Sumar días según la antigüedad
    let saldo = 0;
    for (let i = 0; i < mesesAntiguedad && i < tablaSumatoria.length; i++) {
      saldo += tablaSumatoria[i];
    }

    return saldo;
  }


  showSaldoVacaciones(id: number) {
    this.usuarioService.searchUsersId(id).subscribe((data) => {
      const saldoFormateado = data.usuSaldoVacacional.toFixed(2);

      Swal.fire({
        title: 'Saldo Vacacional',
        html: `Estimado usuario, su saldo es de <b>${saldoFormateado}</b>`,
        icon: 'info',
        confirmButtonText: 'Aceptar',
      });
    });
  }

  loadVac(est: number) {
    this.vacacioneService.allVacData(est).subscribe((response) => {
      this.listaVacaciones = response; // Asigna los datos al array provincias
    });
  }

  updateEstVac(id: number, est: number) {
    this.vacacioneService.updateEst(id, est).subscribe({
      next: () => {
        console.log('eliminado')
        this.loadVac(1)
      },
      error: () => {
        // Manejar errores
      },
      complete: () => {
        // Manejar completado
      }
    });

  }

  searchVac(search: string, est: number) {
    this.vacacioneService.searchVacacionesData(search, est).subscribe((response) => {
      this.listaVacaciones = response; // Asigna los datos al array provincias
    });
  }

  editarVacaciones(vacaciones: Vacaciones) {
    // Clona el registro para no modificar el original directamente
    const vacacionEditada = { ...vacaciones };

    // enviar una solicitud al servidor para actualizar el registro en la base de datos.
    this.vacacioneService.actualizarVacaciones(vacaciones.vacId, vacacionEditada).subscribe(
      () => {
        // Maneja la respuesta exitosa, por ejemplo, actualizando la lista de registros.
        this.getVacacionesByUsuId(this.idUsuario);
      },
      (error: any) => {
        // Maneja los errores, por ejemplo, muestra un mensaje de error al usuario.
        console.error('Ocurrió un error al actualizar el registro: ', error);
      }
    );
  }

}
