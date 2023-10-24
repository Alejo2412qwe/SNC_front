import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { LoginRequest } from 'src/app/modelo/loginRequest';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef, private AllScripts: AllScriptsService,
    private router: Router,
    //SERVICES
    private usuarioService: UsuarioService, private toastr: ToastrService, private sessionStorage: SessionStorageService,
  ) {

    AllScripts.Cargar(["menu"]);

  }

  ngOnInit(): void {
    this.sessionStorage.clear()
    // alert(this.sessionStorage.getItem('token'))
  }

  loginRequest: LoginRequest = new LoginRequest();



  logIn() {
    this.usuarioService.usuarioValido(this.loginRequest.usuNombreUsuario?.trim() || '').subscribe(
      res => {
        if (res) {
          this.usuarioService.logIn(this.loginRequest).subscribe(
            response => {
              if (response) {
                this.sessionStorage.setItem('token', response.token);

                Swal.fire({
                  title: '¡LogIn exitoso!',
                  text: 'BIENVENIDO ' + this.loginRequest.usuNombreUsuario + '.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  showCancelButton: false, // No mostrar el botón de cancelar
                }).then(() => {
                  // Redirige al usuario a la página de inicio de sesión.
                  this.router.navigate(['/gestion']);


                });

              } else {
                alert('user not found')
              }
            }
          )
        } else {
          this.toastr.error('El usuario que ingreso no se encuentra registrado, digite correctamente', 'Nombre de usuario incorrecto', {
            timeOut: 4000
          });
        }
      }

    )

  }


}
