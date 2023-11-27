import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SessionStorageService } from "../services/session-storage.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private sessionStorage: SessionStorageService,
        private toastr: ToastrService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        const expectedRoles = route.data['expectedRoles'];
        const rol = this.sessionStorage.getItem('rol');

        if (expectedRoles.includes(rol)) {
            return true;
        }


        this.toastr.error('ACCESO NO PERMITIDO')
        this.cerrarSesion();
        this.router.navigate(['/login']);
        return false;
    }

    cerrarSesion(): void {
        localStorage.removeItem('userData');
    }

}