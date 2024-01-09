import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { showErrorAlCrear, validarCadena } from 'src/app/common/validaciones';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { Zonales } from 'src/app/modelo/zonales';
import { ExcelService } from 'src/app/services/excel.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ZonalService } from 'src/app/services/zonal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listazonales',
  templateUrl: './listazonales.component.html',
  styleUrls: ['./listazonales.component.css']
})
export class ListazonalesComponent implements OnInit {

  constructor(
    private sessionStorage: SessionStorageService,
    private zonalesService: ZonalService,
    private toastr: ToastrService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.loadZonalesByEstado(1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');



  //OBJETOS
  zonal: Zonales = new Zonales();

  //VARIABLES
  newZonal: string = '';
  newCodigo: string = '';
  searchString: string = '';
  excelReportData: IExcelReportParams | null = null;

  //LISTAS
  listaZonales: Zonales[] = [];

  loadZonalesByEstado(est: number) {
    this.zonalesService.getZonalesByEstado(est).subscribe((data) => {
      this.listaZonales = data;
      this.loadExcelReportData(data)
    });
  }

  saveZonal() {
    this.zonalesService.saveZonal(this.zonal).subscribe((data) => {
      this.loadZonalesByEstado(1);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: data.zonNombre + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  searchZonales(search: string, est: number) {
    this.zonalesService.searchZonales(search, est).subscribe((data) => {
      this.listaZonales = data
      this.loadExcelReportData(data)
    })
  }

  openCrearZonal() {
    Swal.fire({
      title: 'Crear Nueva Zonal',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Nombre De La Zonal" [(ngModel)]="zonal.zonNombre"><input id="swal-input2" class="swal2-input" placeholder="Nombre De La Zonal" [(ngModel)]="zonal.zonNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newZonal = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        this.newCodigo = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newZonal) && validarCadena(this.newCodigo)) {
          this.zonal.zonNombre = this.newZonal;
          this.zonal.zonCodigo = this.newCodigo;
          this.saveZonal();
          this.loadZonalesByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateZonal(id: number) {
    this.zonalesService
      .updateZonal(this.zonal, id)
      .subscribe((data) => {
        this.loadZonalesByEstado(1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.zonNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstZonal(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} la zonal?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.zonalesService.updateEst(id, est).subscribe({
          next: () => {
            this.loadZonalesByEstado(1);
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
        this.loadZonalesByEstado(1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  openUpdateZonal(codigo: string, id: number) {
    this.zonalesService.getZonalById(id).subscribe((data) => {
      Swal.fire({
        title: 'Editar ' + codigo,
        html: `
        <input id="swal-input1" class="swal2-input" placeholder="Código De La Zonal" [(ngModel)]="zonal.zonNombre" value="${data.zonCodigo}">
        <input id="swal-input2" class="swal2-input" placeholder="Nombre De La Zonal" [(ngModel)]="zonal.zonNombre" value="${data.zonNombre}">
        `,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          this.newZonal = (
            document.getElementById('swal-input2') as HTMLInputElement
          ).value;
          this.newCodigo = (
            document.getElementById('swal-input1') as HTMLInputElement
          ).value;
          if (validarCadena(this.newZonal) && validarCadena(this.newCodigo)) {
            this.zonal.zonNombre = this.newZonal;
            this.zonal.zonCodigo = this.newCodigo;
            this.updateZonal(id);
            this.loadZonalesByEstado(1);
          } else {
            showErrorAlCrear();
          }
        },
      });
    })
  }
  loadExcelReportData(data: Zonales[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Zonales";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "CÓDIGO" },
      { header: "NOMBRE" }


    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.zonId,
      codigo: item.zonCodigo,
      nombre: item.zonNombre

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
