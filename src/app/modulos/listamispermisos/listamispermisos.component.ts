import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { base64PDFpreview } from 'src/app/common/base64';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { UploadEvent } from 'src/app/interfaz/UploadEvent';
import { Permisos } from 'src/app/modelo/permisos';
import { Regimen } from 'src/app/modelo/regimen';
import { ExcelService } from 'src/app/services/excel.service';
import { PermisoService } from 'src/app/services/permiso.service';
import { RegimenService } from 'src/app/services/regimen.service';
import { ReportService } from 'src/app/services/report.service';
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
    private reporteService: ReportService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.getPermisosByUsuId(this.idUsuario);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');
  idUsuario: number = this.sessionStorage.getItem('userId') || 0;

  //OBJETOS
  permisos: Permisos = new Permisos();

  //VARIABLES
  newFunciones: string = '';
  estadoActivo: number = 1;
  excelReportData: IExcelReportParams | null = null;

  //LISTAS
  listapermisos: Permisos[] = [];
  uploadedFiles: File[] = [];

  getPermisosByUsuId(id: number) {
    this.permisoService.getPermisosByUsuId(id).subscribe((data) => {
      this.listapermisos = data;
      this.loadExcelReportData(data);
    })
  }

  downloadPermiso(id: number) {
    this.reporteService.getReportePermiso(id).subscribe((data) => {
      const url = URL.createObjectURL(data);
      window.open(url, '_blank');
      console.log('descarga')
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

  loadExcelReportData(data: Permisos[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Mis Permisos";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "FECHA DE EMISIÓN" },
      { header: "OBSERVACIÓN" },
      { header: "FECHA INICIO" },
      { header: "FECHA FIN" },
      { header: "HORAS INICIO" },
      { header: "HORAS FIN" },
      { header: "PERMISO" },
      { header: "FORMULARIO" },
      { header: "ESTADO" }

    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.permId,
      fechaEmision: item.permFechaEmision,
      observacion: item.permObservacion,
      fechaInicio: item.permFechaInicio || 'N/A',
      fechaFin: item.permFechaFin || 'N/A',
      horasInicio: item.permHorasInicio || 'N/A',
      horasFin: item.permHorasFin || 'N/A',
      tipoPermiso: item.tiPeId.tiPeNombre,
      tipoFormulario: item.tiFoId.tiFoNombre,
      estado: (() => {
        switch (item.permEstado) {
          case 1:
            return 'Aprobado Por Jefe General';
          case 2:
            return 'Aprobado Por Jefe De Unidad';
          case 3:
            return 'En espera';
          case 4:
            return 'Rechazado';
          default:
            return 'Estado Desconocido';
        }
      })()
    }));


    if (this.excelReportData) {
      this.excelReportData.logo = logo;
      this.excelReportData.rowData = rowData;
      this.excelReportData.headerItems = headerItems;
      this.excelReportData.reportName = reportName;
    } else {
      this.excelReportData = {
        logo,
        rowData,
        headerItems,
        reportName,
      };
    }

  }

  downloadExcel(): void {
    console.log(this.excelReportData)
    if (this.excelReportData) {
      this.excelService.dowloadExcel(this.excelReportData);
    }
  }
}
