import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IjsonData } from 'src/app/common/jsonData';
import { string_Date } from 'src/app/common/validaciones';
import { UploadEvent } from 'src/app/interfaz/UploadEvent';
import { Asistencia } from 'src/app/modelo/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as moment from 'moment-timezone';
import { Usuario } from 'src/app/modelo/usuario';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-listaarchivos',
  templateUrl: './listaarchivos.component.html',
  styleUrls: ['./listaarchivos.component.css']
})
export class ListaarchivosComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    //SERVICES
    private sessionStorage: SessionStorageService,
    private asistenciaService: AsistenciaService,
    private datePipe: DatePipe,
  ) { }

  uploadedFiles: File[] = [];
  fileName: string = '';
  jsonData: IjsonData[] = [];
  asistenciaList: Asistencia[] = []
  historialAechivos: any[] = []
  user: Usuario = new Usuario()

  ngOnInit(): void {
    this.cargarHistorial()
  }

  uploadFile(event: UploadEvent) {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      this.uploadedFiles = event.files; // Almacena los archivos seleccionados

      const reader = new FileReader();

      // Configuramos una función de devolución de llamada para cuando la lectura del archivo esté completa
      reader.onload = (e: any) => {
        const fileName = file.name.toLowerCase();
        this.fileName = fileName
        if (fileName.endsWith('.xlsx')) {
          // Realizar una acción si es un archivo Excel (.xlsx)
          console.log('Es un archivo Excel (.xlsx)');

          this.cargarExcel(file);


        } else if (fileName.endsWith('.dat')) {
          // Realizar una acción si es un archivo .dat
          console.log('Es un archivo .dat');
          this.cargarDat(file);


        } else {
          // Archivo no válido
          console.log('Archivo no válido');
          this.toastr.error('Archivo incompatible', '', { timeOut: 4000 });
        }
      };

      // Iniciar la lectura del archivo
      reader.readAsArrayBuffer(file);
    }
  }

  cargarHistorial() {
    this.asistenciaService.historialArchivos().subscribe((response) => {
      this.historialAechivos = response; // Asigna los datos al array provincias
    });
  }

  convertirAListaAsistencia(listaIjsonData: IjsonData[]): Asistencia[] {

    this.user.usuId = Number(this.sessionStorage.getItem('userId'))

    return listaIjsonData.map((objFile: IjsonData) => {

      return {
        asisDpto: objFile['Dpto.'],
        asisNombre: objFile.Nombre,
        asisNoLector: objFile['No.'],
        asisFechaHora: objFile['Fecha/Hora'] || new Date(),
        asisEstado: objFile.Estado,
        asisLocacionId: objFile['Locación ID'],
        asisIdNumero: objFile['ID Número'],
        asisCodTrabajo: objFile['Cód.trabajo'],
        asisVerificaCod: objFile.VerificaCod,
        asisNoTarjeta: objFile['No.tarjeta'],
        asisNombreArchivo: this.fileName,
        asisFechaArchivo: new Date(),
        usuId: this.user,
        asisEstadoStr: ''
      };
    });
  }

  cargarExcel(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      this.jsonData = XLSX.utils.sheet_to_json(worksheet);


      this.asistenciaList = this.convertirAListaAsistencia(this.jsonData)

      console.log(this.asistenciaList);


      this.asistenciaService
        .saveAll(this.asistenciaList)
        .subscribe((response) => {
          this.cargarHistorial()
          Swal.fire({
            title: '¡Registro Exitoso!',
            text: 'Archivo guardado exitosamente',
            icon: 'success',
            confirmButtonText: 'Confirmar',
            showCancelButton: false, // No mostrar el botón de cancelar
          }).then(() => {
            // this.router.navigate(['/listausu']);
          });
        });
    };


    reader.readAsArrayBuffer(file);
  }

  cargarDat(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;
      this.parseFileContent(fileContent);
    };
    reader.readAsText(file);
  }
  parseFileContent(fileContent: string): void {
    // Aquí debes implementar la lógica para transformar el contenido del archivo en formato JSON.
    // Puedes usar funciones de JavaScript o bibliotecas como PapaParse si es necesario.
    // Luego, puedes mostrar el JSON en tu aplicación.
    this.jsonData = this.transformFileContentToJSON(fileContent);
    this.asistenciaList = this.convertirAListaAsistencia(this.jsonData);
    this.asistenciaService
      .saveAll(this.asistenciaList)
      .subscribe((response) => {
        this.cargarHistorial()
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Archivo guardado exitosamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        }).then(() => {
          // this.router.navigate(['/listausu']);
        });
      });
    console.log(this.jsonData);
  }

  transformFileContentToJSON(fileContent: string): any {
    const lines = fileContent.split('\n');
    const jsonData = [];

    for (const line of lines) {
      const parts = line.split('\t');
      // const dateParts = parts[2]?.trim().split(' '); // Dividir la fecha y la hora

      // Crear un objeto Date a partir de la cadena de fecha
      // const date = new Date(dateParts[0] + 'T' + dateParts[1]);

      const obj = {
        "No.": parts[0]?.trim(),
        Nombre: parts[1]?.trim(),
        "Fecha/Hora": parts[2], // Guardar la fecha (formato ISO)
        "No.tarjeta": parts[3]?.trim(),
        Estado: parts[4]?.trim(),
        // Continúa con las otras propiedades...
      };

      jsonData.push(obj);
    }

    return jsonData;
  }




}
