import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelo/persona';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../../services/session-storage.service'; // Importa SessionStorageService
import { Provincia } from 'src/app/modelo/provincia';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private sessionStorage: SessionStorageService,
    private router: Router, private toastr: ToastrService, private provinciaService: ProvinciaService
  ) { }




  //Objetos
  persona: Persona = new Persona();
  selectProvincia: Provincia = new Provincia(0, 'Seleccione una Provincia');
  listProvincias: Provincia[] = []; // Inicializa provincias como un array vacío

  ngOnInit(): void {
    // console.log(this.sessionStorage.getItem('token'))
    this.cargarProvincias()
  }

  cargarProvincias() {
    this.provinciaService.getAllProvincias().subscribe(
      response => {
        console.log(response);
        this.listProvincias = response; // Asigna los datos al array provincias
      }
    );
  }


  mostrarProv() {
    alert(this.selectProvincia)
  }

  registrar(): void {
    // Recupera el token de SessionStorage
    // const token = this.sessionStorage.retrieve('miToken');

    console.log('¡Registrado! ' + JSON.stringify(this.persona));
    // console.log('Token: ' + token); // Imprime el token en la consola

    Swal.fire({
      title: 'Crear Nuevo Rol',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Rol">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    });
  }


}