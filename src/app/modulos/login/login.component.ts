import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { LoginRequest } from 'src/app/modelo/loginRequest';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import jwt_decode from "jwt-decode";

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


  decodeToken(token: string) {
    try {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken) {

        const rol = decodedToken['rol']; // Accede a la reclamación "rol"
        this.sessionStorage.setItem('rol', rol[0].authority);
        // console.log("rol= " + this.sessionStorage.getItem('rol'))

        const username = decodedToken['sub']; // Accede a la reclamación "sub"
        this.sessionStorage.setItem('username', username);
        // console.log("username= " + this.sessionStorage.getItem('username'))

        const userId = decodedToken['id']; // Accede a la reclamación "sub"
        this.sessionStorage.setItem('userId', userId);
        // console.log("username= " + this.sessionStorage.getItem('username'))


        return
      } else {
        console.error("Token inválido o no contiene información de rol.");
        return
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return
    }
  }


  logIn() {
    this.usuarioService.usuarioValido(this.loginRequest.usuNombreUsuario?.trim() || '').subscribe(
      res => {
        if (res) {
          this.usuarioService.logIn(this.loginRequest).subscribe(
            response => {
              if (response) {
                this.sessionStorage.setItem('token', response.token);
                this.decodeToken(response.token);
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
