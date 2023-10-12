import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class TokenExpirationInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastr: ToastrService,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    let errorMessage: string;

                    // Verifica el tipo de solicitud y configura el mensaje en consecuencia
                    if (request.url.includes('/login')) {

                        this.toastr.error('Digite correctamente', 'Contraseña incorrecta', {
                            timeOut: 4000
                        });
                    }
                    // else if (request.url.includes('/login')) {
                    //     errorMessage = 'Mensaje para el método logIn';
                    // } 
                    else {
                        Swal.fire({
                            title: '¡Su sesión ha expirado!',
                            text: 'Por favor, inicie sesión nuevamente para continuar.',
                            icon: 'warning',
                            confirmButtonText: 'Iniciar sesión',
                            showCancelButton: false, // No mostrar el botón de cancelar
                        }).then(() => {
                            // Redirige al usuario a la página de inicio de sesión.
                            this.router.navigate(['/login']);
                        });
                    }


                }
                return throwError(error);
            })
        );
    }
}


// @Injectable()
// export class TokenExpirationInterceptor implements HttpInterceptor {
//     constructor(private router: Router) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler) {
//         return next.handle(request).pipe(
//             catchError((error: HttpErrorResponse) => {
//                 // if (error.status === 401 || error.status === 403) {
//                 // Token expirado, muestra un mensaje de advertencia al usuario y redirige a la página de inicio de sesión.
//                 if (error.status === 403) {

//                     Swal.fire({
//                         title: '¡Su sesión ha expirado!',
//                         text: 'Por favor, inicie sesión nuevamente para continuar.',
//                         icon: 'warning',
//                         confirmButtonText: 'Iniciar sesión',
//                         showCancelButton: false, // No mostrar el botón de cancelar
//                     }).then(() => {
//                         // Redirige al usuario a la página de inicio de sesión.
//                         this.router.navigate(['/login']);
//                     });
//                 }
//                 return throwError(error);
//             })
//         );
//     }

// }
