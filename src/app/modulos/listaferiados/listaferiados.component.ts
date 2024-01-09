import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { final_Date, showErrorAlCrear } from 'src/app/common/validaciones';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { Feriados } from 'src/app/modelo/feriados';
import { ExcelService } from 'src/app/services/excel.service';
import { FeriadoService } from 'src/app/services/feriado.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaferiados',
  templateUrl: './listaferiados.component.html',
  styleUrls: ['./listaferiados.component.css']
})
export class ListaferiadosComponent implements OnInit {

  constructor(
    private sessionStorage: SessionStorageService,
    private feriadoService: FeriadoService,
    private toastr: ToastrService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.loadFeriadosByEstado(1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  feriado: Feriados = new Feriados();

  //VARIABLES
  newFechaInicio: string = '';
  newFechaFin: string = '';
  excelReportData: IExcelReportParams | null = null;

  //LISTAS
  listaFeriados: Feriados[] = [];

  formatFecha(fecha: string): string {
    const fechaDate = new Date(fecha);
    const fechaLocal = new Date(fechaDate.getTime() + fechaDate.getTimezoneOffset() * 60000);
    return fechaLocal.toLocaleDateString();
  }

  loadExcelReportData(data: Feriados[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Feriados";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "FECHA INICIO" },
      { header: "FECHA FIN" }


    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.ferId,
      fechaInicio: item.ferFechaInicio,
      fechaFin: item.ferFechaFin

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

  loadFeriadosByEstado(est: number) {
    this.feriadoService.getFeriadosByEstado(est).subscribe((data) => {
      this.listaFeriados = data;
      this.loadExcelReportData(data)
    });
  }

  saveFeriado() {
    this.feriadoService.saveFeriados(this.feriado).subscribe((data) => {
      this.loadFeriadosByEstado(1);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: 'Feriado agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  openCrearFeriado() {
    Swal.fire({
      title: 'Crear Nuevo Feriado',
      html:
        `      
        <div class="input-container">
        <label for="name" class="name">Fecha Inicio:</label>
        <input style="padding: 10px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            background-color: #f1f1f1;
            color: #777;
            width: 100%;
            outline: none;" placeholder="Enter your name" type="date" class="input" id="swal-input1">
        <div class="underline"></div>
    </div>
  
    <div class="input-container">
    <label for="name" class="name">Fecha Fin:</label>
    <input style="padding: 10px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        background-color: #f1f1f1;
        color: #777;
        width: 100%;
        outline: none;" placeholder="Enter your name" type="date" class="input" id="swal-input2">
    <div class="underline"></div>
  </div>   
      `,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newFechaInicio = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.newFechaFin = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;

        if (this.newFechaInicio && this.newFechaFin) {
          this.feriado.ferFechaInicio = this.newFechaInicio;
          this.feriado.ferFechaFin = this.newFechaFin;
          if (this.feriado.ferFechaInicio < this.feriado.ferFechaFin) {
            this.saveFeriado();
            this.loadFeriadosByEstado(1);
          } else {
            Swal.showValidationMessage("La fecha de inicio debe ser menor a la fecha fin.")
          }
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateFeriados(id: number) {
    this.feriadoService
      .updateFeriados(this.feriado, id)
      .subscribe((data) => {
        this.loadFeriadosByEstado(1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: 'Feriado agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstFeriado(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} el feriado?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.feriadoService.updateEst(id, est).subscribe({
          next: () => {
            this.loadFeriadosByEstado(1);
            if (est === 0) {
              this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
            } else {
              this.toastr.success('ACTIVADO CORRECTAMENTE', 'ÉXITO');
            }
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => { },
        });
      } else if (result.isDenied) {
        this.loadFeriadosByEstado(1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  openUpdateFeriado(id: number) {
    this.feriadoService.getFeriadosById(id).subscribe((data) => {
      Swal.fire({
        title: 'Editar Feriado',
        html: `
          <div class="input-container">
            <label for="swal-input1" class="name">Fecha Inicio:</label>
            <input style="padding: 10px; font-size: 16px; border: none; border-radius: 4px; background-color: #f1f1f1; color: #777; width: 100%; outline: none;" placeholder="Enter your name" type="date" class="input" id="swal-input1" value="${data.ferFechaInicio}">
            <div class="underline"></div>
          </div>
    
          <div class="input-container">
            <label for="swal-input2" class="name">Fecha Fin:</label>
            <input style="padding: 10px; font-size: 16px; border: none; border-radius: 4px; background-color: #f1f1f1; color: #777; width: 100%; outline: none;" placeholder="Enter your name" type="date" class="input" id="swal-input2" value="${data.ferFechaFin}">
            <div class="underline"></div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          this.newFechaInicio = (
            document.getElementById('swal-input1') as HTMLInputElement
          ).value;
          this.newFechaFin = (
            document.getElementById('swal-input2') as HTMLInputElement
          ).value;

          if (this.newFechaInicio && this.newFechaFin) {
            this.feriado.ferFechaInicio = this.newFechaInicio;
            this.feriado.ferFechaFin = this.newFechaFin;
            if (this.feriado.ferFechaInicio < this.feriado.ferFechaFin) {
              this.updateFeriados(id);
              this.loadFeriadosByEstado(1);
            } else {
              Swal.showValidationMessage("La fecha.")
            }
          } else {
            showErrorAlCrear();
          }
        },
      });
    });
  }
}
