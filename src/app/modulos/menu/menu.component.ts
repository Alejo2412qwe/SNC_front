import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Usuario } from 'src/app/modelo/usuario';
import { PROFILE } from 'src/app/common/img64';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef, private AllScripts: AllScriptsService,
    private usuarioService: UsuarioService, private toastr: ToastrService, private sessionStorage: SessionStorageService,) {

    AllScripts.Cargar(["header"]);

  }

  usuario: Usuario = new Usuario();
  userImg = PROFILE

  ngOnInit(): void {
    this.loadDataUser();
  }

  loadDataUser() {
    this.usuarioService.searchUsersId(this.sessionStorage.getItem('userId') || 0).subscribe((response) => {
      this.usuario = response;
      console.log(response)
      this.usuario.usuContrasena = '';
    });
  }


}
