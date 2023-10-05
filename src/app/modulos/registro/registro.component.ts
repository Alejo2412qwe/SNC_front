import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelo/persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  persona: Persona = new Persona();

  constructor() { }
  
  ngOnInit(): void {
  }

  registrar(): void {
    console.log('¡Registrado!');

    Swal.fire({
      title: 'Crear Nuevo Rol',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Rol">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    });
  }
}