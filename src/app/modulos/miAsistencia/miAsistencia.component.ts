import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { IListAsistencia } from 'src/app/interfaz/IListAsistencia';
import { Asistencia } from 'src/app/modelo/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-miAsistencia',
  templateUrl: './miAsistencia.component.html',
  styleUrls: ['./miAsistencia.component.css']
})
export class MiAsistenciaComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private router: Router,
    //SERVICES
    private sessionStorage: SessionStorageService,
    private asistenciaService: AsistenciaService,
    private excelService: ExcelService,
  ) { }

  registroAsistencia: Asistencia[] = []
  listAsistencia: IListAsistencia[] = []
  search: string = '';
  fechaMin: string = '';
  fechaMax: string = this.fechaMaxSearch(new Date());
  excelReportData: IExcelReportParams | null = null;

  ngOnInit(): void {
    this.filtroAsistencia()
  }


  limpiarFiltro() {
    this.search = '';
    this.fechaMin = '';
    this.fechaMax = this.fechaMaxSearch(new Date());
    this.filtroAsistencia()
  }


  cargarHistorial() {
    this.asistenciaService.getAllAsistencia().subscribe((response) => {
      this.registroAsistencia = response; // Asigna los datos al array provincias
    });
  }

  filtroAsistencia() {
    this.asistenciaService.miAsistencia(Number(this.sessionStorage.getItem('userId')), this.fechaMin, `${this.fechaMax} 23:59:59`).subscribe((response) => {
      this.listAsistencia = response; // Asigna los datos al array provincias
      this.loadExcelReportData(response)
    });
  }

  fechaMaxSearch(fecha: Date): string {

    const anio: number = fecha.getFullYear();
    const mes: number = fecha.getMonth() + 1;
    const dia: number = fecha.getDate();

    return (`${anio}-${mes}-${dia}`)
  }

  loadExcelReportData(data: IListAsistencia[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Mi Asistencia";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "ID LECTOR" },
      { header: "CÉDULA" },
      { header: "NOMBRE" },
      { header: "APELLIDOS" },
      { header: "FECHA | HORA" },
      { header: "DEPARTAMENTO" },
      { header: "LOCACIÓN" },
      { header: "ESTADO" },

    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.asisId?.asisId,
      idLector: item.asisId?.asisNoLector,
      perCedula: item.userId?.usuPerId?.perCedula,
      perNombre: item.userId?.usuPerId?.perNombre,
      perApellido: item.userId?.usuPerId?.perApellido,
      asisFechaHora: item.asisId?.asisFechaHora,
      asisDpto: item.asisId?.asisDpto,
      asisLocacionId: item.asisId?.asisLocacionId,
      asisEstado: item.asisId?.asisEstado,

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


  getCellStyle(asisEstadoStr: string | undefined): { [key: string]: string } {
    if (asisEstadoStr === 'Ingreso Atrasado') {
      return { 'background-color': '#F7A4A4' };
    } else

      if (asisEstadoStr === 'Ingreso Puntual' || asisEstadoStr === 'Ingreso Anticipado'
        || asisEstadoStr === 'Salida Puntual' || asisEstadoStr === 'Salida Retrasada') {
        return { 'background-color': '#B6E2A1' };
      } else

        if (asisEstadoStr === 'Salida Temprana') {
          return { 'background-color': '#FFFBC1' };
        } else {

          return {};  // Estilo predeterminado si no coincide con ninguna condición
        }
  }

}
