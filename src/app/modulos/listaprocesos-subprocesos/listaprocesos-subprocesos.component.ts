import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Procesos } from 'src/app/modelo/procesos';
import { Subprocesos } from 'src/app/modelo/subprocesos';
import { ProcesosService } from 'src/app/services/procesos.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SubprocesosService } from 'src/app/services/subprocesos.service';
import Swal from 'sweetalert2';
import { validarCadena } from 'src/app/common/validaciones';
import { showErrorAlCrear } from 'src/app/common/validaciones';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-listaprocesos-subprocesos',
  templateUrl: './listaprocesos-subprocesos.component.html',
  styleUrls: ['./listaprocesos-subprocesos.component.css'],
})
export class ListaprocesosSubprocesosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private subprocesosService: SubprocesosService,
    private procesoService: ProcesosService,
    private toastr: ToastrService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.cargarSubprocesos(1, 1);
    this.loadProcesosByEstado(1);
    this.loadSubprocesosByProcEstado(1, 1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  subproceso: Subprocesos = new Subprocesos();
  proceso: Procesos = new Procesos();
  procesoSelected: any;

  //VARIABLES
  newProceso: string = '';
  newSubproceso: string = '';
  searchString: string = '';
  searchString2: string = '';
  excelReportData: IExcelReportParams | null = null;

  //LISTAS
  listaProcesos: Procesos[] = [];
  listaSubprocesos: Subprocesos[] = [];

  cargarSubprocesos(estProc: number, estSub: number) {
    this.subprocesosService.getSubprocesosByProcEstado(estProc, estSub).subscribe((data) => {
      this.listaSubprocesos = data;
      this.loadExcelReportDataSubprocesos(data)
    });
  }

  searchProcesos(search: string, est: number) {
    this.procesoService.searchProcesos(search, est).subscribe((data) => {
      this.listaProcesos = data
      this.loadExcelReportDataProcesos(data)
    })
  }

  searchSubprocesos(search: string, est: number) {
    this.subprocesosService.searchSubprocesos(search, est).subscribe((data) => {
      this.listaSubprocesos = data
      this.loadExcelReportDataSubprocesos(data)
    })
  }

  /*inicio del proceso*/
  saveProceso() {
    this.procesoService.saveProcesos(this.proceso).subscribe((data) => {
      this.loadProcesosByEstado(1);
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: data.procNombre + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  openCrearProceso() {
    Swal.fire({
      title: 'Crear Nuevo Proceso',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newProceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newProceso)) {
          this.proceso.procNombre = this.newProceso;
          this.saveProceso();
          this.loadProcesosByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateProceso(id: number) {
    this.procesoService.updateProcesos(this.proceso, id).subscribe((data) => {
      this.loadProcesosByEstado(1);
      this.loadSubprocesosByProcEstado(1, 1);
      Swal.fire({
        title: 'Edición Exitosa!',
        text: data.procNombre + ' agregado correctamente',
        icon: 'success',
        confirmButtonText: 'Confirmar',
        showCancelButton: false, // No mostrar el botón de cancelar
      });
    });
  }

  updateEstProceso(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} al proceso?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.procesoService.updateEst(id, est).subscribe({
          next: () => {
            this.loadProcesosByEstado(1);
            this.loadSubprocesosByProcEstado(1, 1);
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
        this.loadProcesosByEstado(1);
        this.loadSubprocesosByProcEstado(
          1,
          this.subproceso.subEstado
        );
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  openUpdateProceso(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Proceso o Zona" [(ngModel)]="proceso.procNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newProceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newProceso)) {
          this.proceso.procNombre = this.newProceso;
          this.updateProceso(id);
          this.loadProcesosByEstado(1);
          this.loadSubprocesosByProcEstado(
            1,
            this.subproceso.subEstado
          );
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  loadProcesosByEstado(est: number) {
    this.procesoService.getProcesosByEstado(est).subscribe((response) => {
      this.listaProcesos = response; // Asigna los datos al array provincias
      this.loadExcelReportDataProcesos(response)
    });
  }
  /*fin del proceso*/

  /*inicio del subproceso*/
  saveSubproceso() {
    this.subprocesosService
      .saveSubprocesos(this.subproceso)
      .subscribe((data) => {
        this.cargarSubprocesos(1, 1);
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.subNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearSubproceso(procId: number) {
    this.cargarSubprocesos(1, 1);
    Swal.fire({
      title: 'Crear Nuevo Subproceso',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Subproceso o Departamento" [(ngModel)]="subproceso.subNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newSubproceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newSubproceso)) {
          this.subproceso.procId.procId = procId;
          this.subproceso.subNombre = this.newSubproceso;
          this.saveSubproceso();
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  openUpdateSubproceso(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Subproceso o Departamento" [(ngModel)]="subproceso.subNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newSubproceso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newSubproceso)) {
          this.subproceso.subNombre = this.newSubproceso;
          this.updateSubproceso(id);
          this.loadProcesosByEstado(1);
          this.loadSubprocesosByProcEstado(
            1,
            this.subproceso.subEstado
          );
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateSubproceso(id: number) {
    this.subprocesosService
      .updateSubproceso(this.subproceso, id)
      .subscribe((data) => {
        this.loadSubprocesosByProcEstado(1, 1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.subNombre + ' editado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstSubproceso(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} al subproceso?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subprocesosService.updateEst(id, est).subscribe({
          next: () => {
            this.loadSubprocesosByProcEstado(1, 1);
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
        this.loadSubprocesosByProcEstado(1, 1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  loadSubprocesosByProcEstado(estproc: number, estsub: number) {
    this.subprocesosService
      .getSubprocesosByProcEstado(estproc, estsub)
      .subscribe((response) => {
        this.listaSubprocesos = response; // Asigna los datos al array provincias
      });
  }
  /*fin del proceso*/

  loadExcelReportDataProcesos(data: Procesos[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Procesos";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "NOMBRE" },
    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.procId,
      codigo: item.procNombre

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

  loadExcelReportDataSubprocesos(data: Subprocesos[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Subprocesos";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "NOMBRE" },
      { header: "PERTENECE A" }


    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.subId,
      codigo: item.subNombre,
      nombre: item.procId.procNombre

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

  generateAndDownloadExcelProcesos(data: Procesos[]): void {
    this.loadExcelReportDataProcesos(data);
    this.downloadExcel();
  }

  generateAndDownloadExcelSubprocesos(data: Subprocesos[]): void {
    this.loadExcelReportDataSubprocesos(data);
    this.downloadExcel();
  }
}
