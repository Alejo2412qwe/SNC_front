import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IListAsistencia } from 'src/app/interfaz/IListAsistencia';
import { Asistencia } from 'src/app/modelo/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-miAsistencia',
  templateUrl: './miAsistencia.component.html',
  styleUrls: ['./miAsistencia.component.css']
})
export class MiAsistenciaComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private router: Router,
    //SERVICES
    private sessionStorage: SessionStorageService,
    private asistenciaService: AsistenciaService,
  ) { }

  registroAsistencia: Asistencia[] = []
  listAsistencia: IListAsistencia[] = []
  search: string = '';
  fechaMin: string = '';
  fechaMax: string = this.fechaMaxSearch(new Date());

  ngOnInit(): void {
    this.filtroAsistencia()
  }


  limpiarFiltro() {
    this.search = '';
    this.fechaMin = '';
    this.fechaMax = this.fechaMaxSearch(new Date());
    this.filtroAsistencia()
  }


  cargarHistorial() {
    this.asistenciaService.getAllAsistencia().subscribe((response) => {
      this.registroAsistencia = response; // Asigna los datos al array provincias
    });
  }

  filtroAsistencia() {
    this.asistenciaService.miAsistencia(Number(this.sessionStorage.getItem('userId')), this.fechaMin, `${this.fechaMax} 23:59:59`).subscribe((response) => {
      this.listAsistencia = response; // Asigna los datos al array provincias
      console.log(response)
    });
  }

  fechaMaxSearch(fecha: Date): string {

    const anio: number = fecha.getFullYear();
    const mes: number = fecha.getMonth() + 1;
    const dia: number = fecha.getDate();

    return (`${anio}-${mes}-${dia}`)
  }

}
