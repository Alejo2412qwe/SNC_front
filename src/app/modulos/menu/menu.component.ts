import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef, private AllScripts: AllScriptsService) {

    AllScripts.Cargar(["header"]);

   }


  ngOnInit(): void {


  }

  
}
