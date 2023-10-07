import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class TokenExpirationInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // if (error.status === 401 || error.status === 403) {
                // Token expirado, muestra un mensaje de advertencia al usuario y redirige a la página de inicio de sesión.
                if (error.status === 403) {

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
                return throwError(error);
            })
        );
    }

}
