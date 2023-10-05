import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class TokenExpirationInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    // Token expirado, redirige al usuario a la página de inicio de sesión o muestra un mensaje
                    // y requiere que el usuario vuelva a autenticarse.
                    alert("EXPIRADO")
                }
                return throwError(error);
            })
        );
    }
}
