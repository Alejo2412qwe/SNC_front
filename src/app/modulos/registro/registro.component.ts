import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelo/persona';

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
  }
}