export class LoginRequest {
  usuNombreUsuario: string;
  usuContrasena: string;


  constructor(
    usuNombreUsuario?: string,
    usuContrasena?: string,

  ) {
    this.usuNombreUsuario = usuNombreUsuario || '';
    this.usuContrasena = usuContrasena || '';

  }
}
