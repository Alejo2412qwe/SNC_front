import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Funciones } from 'src/app/modelo/funciones';
import { FuncionesService } from 'src/app/services/funciones.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';
import { validarCadena } from 'src/app/common/validaciones';
import { showErrorAlCrear } from 'src/app/common/validaciones';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-lista-funciones',
  templateUrl: './lista-funciones.component.html',
  styleUrls: ['./lista-funciones.component.css'],
})
export class ListaFuncionesComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private funcionesService: FuncionesService,
    private toastr: ToastrService,
    private excelService: ExcelService,
  ) { }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  funciones: Funciones = new Funciones();
  funcionesSelected: any;

  //VARIABLES
  newFunciones: string = '';
  estadoActivo: number = 1;
  searchString: string = '';
  excelReportData: IExcelReportParams | null = null;

  //LISTAS
  listaFunciones: Funciones[] = [];

  ngOnInit(): void {
    this.cargarFunciones();
    this.loadFuncionesByEstado(this.estadoActivo);
  }

  cargarFunciones() {
    this.funcionesService.getAllFunciones().subscribe((data) => {
      this.listaFunciones = data;
      this.loadExcelReportData(data);
    });
  }

  saveProceso() {
    this.funcionesService.saveFunciones(this.funciones).subscribe((data) => {
      this.loadFuncionesByEstado(this.estadoActivo);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: data.funNombre + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  loadFuncionesByEstado(est: number) {
    this.funcionesService.getFuncionesByEstado(est).subscribe((response) => {
      this.listaFunciones = response; // Asigna los datos al array Funciones
    });
  }

  searchFunciones(search: string, est: number) {
    this.funcionesService.searchFunciones(search, est).subscribe((data) => {
      this.listaFunciones = data
      this.loadExcelReportData(data);
    })
  }

  openCrearFuncion() {
    Swal.fire({
      title: 'Crear Nueva Función',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newFunciones = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newFunciones)) {
          this.funciones.funNombre = this.newFunciones;
          this.saveProceso();
          this.loadFuncionesByEstado(this.estadoActivo);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateFuncion(id: number) {
    this.funcionesService
      .updateFunciones(this.funciones, id)
      .subscribe((data) => {
        this.loadFuncionesByEstado(this.estadoActivo);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.funNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstFuncion(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} la función?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionesService.updateEst(id, est).subscribe({
          next: () => {
            this.loadFuncionesByEstado(this.estadoActivo);
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
        this.loadFuncionesByEstado(this.estadoActivo);
        this.estadoActivo;
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  openUpdateFuncion(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newFunciones = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newFunciones)) {
          this.funciones.funNombre = this.newFunciones;
          this.updateFuncion(id);
          this.loadFuncionesByEstado(this.estadoActivo);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  loadExcelReportData(data: Funciones[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Funciones";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "NOMBRE" }

    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.funId,
      nombre: item.funNombre

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
