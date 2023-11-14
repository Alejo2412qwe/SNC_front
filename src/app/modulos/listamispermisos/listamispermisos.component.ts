import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { base64PDFpreview } from 'src/app/common/base64';
import { UploadEvent } from 'src/app/interfaz/UploadEvent';
import { Permisos } from 'src/app/modelo/permisos';
import { Regimen } from 'src/app/modelo/regimen';
import { PermisoService } from 'src/app/services/permiso.service';
import { RegimenService } from 'src/app/services/regimen.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listamispermisos',
  templateUrl: './listamispermisos.component.html',
  styleUrls: ['./listamispermisos.component.css'],
})
export class ListamispermisosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
    private permisoService: PermisoService,
  ) { }

  ngOnInit(): void {
    this.getPermisosByUsuId(this.sessionStorage.getItem('userId') || 0);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  permisos: Permisos = new Permisos();

  //VARIABLES
  newFunciones: string = '';
  estadoActivo: number = 1;

  //LISTAS
  listapermisos: Permisos[] = [];
  uploadedFiles: File[] = [];

  getPermisosByUsuId(id: number) {
    this.permisoService.getPermisosByUsuId(id).subscribe((data) => {
      this.listapermisos = data
    })
  }

  previewBase64PDF(base64: string, filename: string) {
    base64PDFpreview(base64, filename)
  }

  uploadFile(id: number, event: UploadEvent) {
    console.log("Upload event triggered");
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      this.uploadedFiles = event.files; // Almacena los archivos seleccionados

      const reader = new FileReader();

      // Configuramos una función de devolución de llamada para cuando la lectura del archivo esté completa
      reader.onload = (e: any) => {
        // e.target.result contiene la representación Base64 del archivo
        const base64String = e.target.result;

        // Almacena el resultado en this.usuario.foto
        // this.permisoService.updatePermiso(id, base64String);
        this.permisoService.
          updatePermiso(id, base64String)
          .subscribe((response) => {
            Swal.fire({
              title: '¡Archivo subido con exito!',
              text: '',
              icon: 'success',
              confirmButtonText: 'Confirmar',
              showCancelButton: false, // No mostrar el botón de cancelar
            }).then(() => {

            });
          });
      };

      // Leemos el archivo como una URL de datos (Base64)
      reader.readAsDataURL(file);
    }
  }
}
