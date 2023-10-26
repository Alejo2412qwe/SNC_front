import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-despegablemene',
  templateUrl: './despegablemene.component.html',
  styleUrls: ['./despegablemene.component.css']
})
export class DespegablemeneComponent implements OnInit{

  
  constructor(private renderer: Renderer2, private el: ElementRef, private AllScripts: AllScriptsService, private router: Router){



  }
  ngOnInit(): void {


  }

}
