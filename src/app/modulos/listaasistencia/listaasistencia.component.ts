import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Asistencia } from 'src/app/modelo/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-listaasistencia',
  templateUrl: './listaasistencia.component.html',
  styleUrls: ['./listaasistencia.component.css']
})
export class ListaasistenciaComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    //SERVICES
    private sessionStorage: SessionStorageService,
    private asistenciaService: AsistenciaService,

  ) { }

  registroAsistencia: Asistencia[] = []

  ngOnInit(): void {
    this.cargarHistorial()
  }



  cargarHistorial() {
    this.asistenciaService.getAllAsistencia().subscribe((response) => {
      this.registroAsistencia = response; // Asigna los datos al array provincias
      console.log(response)
    });
  }
}
