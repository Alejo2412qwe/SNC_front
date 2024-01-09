import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Institucion } from 'src/app/modelo/Institucion';
import { TipoInstitucion } from 'src/app/modelo/tipoInstitucion';
import { InstitucionService } from 'src/app/services/institucion.service';
import { tipoInstitucionService } from 'src/app/services/tipoInstitucion.service';
import Swal from 'sweetalert2';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { validarCadena } from 'src/app/common/validaciones';
import { showErrorAlCrear } from 'src/app/common/validaciones';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-listainstituciones',
  templateUrl: './listainstituciones.component.html',
  styleUrls: ['./listainstituciones.component.css'],
})
export class ListainstitucionesComponent implements OnInit {
  constructor(
    //services
    private institucionService: InstitucionService,
    private tipInstitucionService: tipoInstitucionService,
    private toastr: ToastrService,
    private sessionStorage: SessionStorageService,
    private excelService: ExcelService
  ) { }

  //usuario de la sesion actual
  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //OBJETOS
  institucion: Institucion = new Institucion();
  tipInstitucion: TipoInstitucion = new TipoInstitucion();

  //VARIABLES
  newInstitucion: string = '';
  newCodigo: string = '';
  newCalle1: string = '';
  newCalle2: string = '';
  newInstDireccion: string = '';
  newReferencia: string = '';
  newTipoinstitucion: string = '';
  searchString: string = '';
  searchString2: string = '';
  excelReportData: IExcelReportParams | null = null;

  //LISTAS
  listaInstituciones: Institucion[] = [];
  listaTipoInstituciones: TipoInstitucion[] = [];

  ngOnInit(): void {
    this.loadInstitucionesByTipId(1, 1);
    this.loadTipoInstitucionByEstado(1);
  }

  cargarInstitucionesByEstado(est: number) {
    this.institucionService.getInstitucionesByEstado(est).subscribe((data) => {
      this.listaInstituciones = data;
    });
  }

  cargarTipoInstituciones() {
    this.tipInstitucionService.getAllTipoInstituciones().subscribe((data) => {
      this.listaTipoInstituciones = data;
    });
  }

  /*inicio de Institucion*/
  saveInstitucion() {
    this.institucionService
      .saveInstitucion(this.institucion)
      .subscribe((data) => {
        this.cargarInstitucionesByEstado(1);
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.instNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearInstitucion(tipId: number) {
    Swal.fire({
      title: 'Crear Nueva Institución',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Código de la Institución"><input id="swal-input2" class="swal2-input" placeholder="Institución"><input id="swal-input3" class="swal2-input" placeholder="Calle Principal"><input id="swal-input4" class="swal2-input" placeholder="Calle Secundaria"><input id="swal-input5" class="swal2-input" placeholder="Referencia">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newCodigo = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.newInstitucion = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        this.newCalle1 = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        this.newCalle2 = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        this.newReferencia = (
          document.getElementById('swal-input5') as HTMLInputElement
        ).value;
        this.newInstDireccion = this.newCalle1 + ' Con ' + this.newCalle2;
        if (
          validarCadena(this.newInstitucion) &&
          validarCadena(this.newInstDireccion) &&
          validarCadena(this.newCodigo) &&
          validarCadena(this.newReferencia)
        ) {
          this.institucion.tipId.tipId = tipId;
          this.institucion.instCodigo = this.newCodigo;
          this.institucion.instNombre = this.newInstitucion;
          this.institucion.instReferencia = this.newReferencia;
          this.institucion.instDireccion = this.newInstDireccion;
          this.saveInstitucion();
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  searchInstitucion(search: string, est: number) {
    this.institucionService.searchInstitucion(search, est).subscribe((data) => {
      this.listaInstituciones = data
      this.loadExcelReportDataInstitucion(data)
    })
  }

  searchTipoInstitucion(search: string, est: number) {
    this.tipInstitucionService.searchTipoInstitucion(search, est).subscribe((data) => {
      this.listaTipoInstituciones = data
      this.loadExcelReportDataTipoInstitucion(data)
    })
  }

  openUpdateInstitucion(nombre: string, id: number) {
    this.institucionService.getInstitucionById(id).subscribe((institucion: Institucion) => {
      const htmlContent = `<input id="swal-input1" class="swal2-input" placeholder="Código de la Institución" value="${institucion.instCodigo}">
        <input id="swal-input2" class="swal2-input" placeholder="Institución" value="${institucion.instNombre}">
        <input id="swal-input3" class="swal2-input" placeholder="Calle Principal" value="${institucion.instDireccion}">
        <input id="swal-input4" class="swal2-input" placeholder="Calle Secundaria">
        <input id="swal-input5" class="swal2-input" placeholder="Referencia" value="${institucion.instReferencia}">`;
      Swal.fire({
        title: 'Editar ' + nombre,
        html: htmlContent,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          this.newCodigo = (document.getElementById('swal-input1') as HTMLInputElement).value.trim();
          this.newInstitucion = (document.getElementById('swal-input2') as HTMLInputElement).value.trim();
          this.newCalle1 = (document.getElementById('swal-input3') as HTMLInputElement).value.trim();
          this.newCalle2 = (document.getElementById('swal-input4') as HTMLInputElement).value.trim();
          this.newReferencia = (document.getElementById('swal-input5') as HTMLInputElement).value.trim();
          this.newInstDireccion = this.newCalle1 + ' Con ' + this.newCalle2;
          if (
            validarCadena(this.newInstitucion) &&
            validarCadena(this.newInstDireccion) &&
            validarCadena(this.newCodigo) &&
            validarCadena(this.newReferencia)
          ) {
            this.institucion.instCodigo = this.newCodigo;
            this.institucion.instNombre = this.newInstitucion;
            this.institucion.instReferencia = this.newReferencia;
            this.institucion.instDireccion = this.newInstDireccion;
            this.updateInstitucion(id);
            return true;
          } else {
            showErrorAlCrear();
            return false;
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadInstitucionesByTipId(1, this.institucion.instEstado);
        }
      });
    });
  }

  updateInstitucion(id: number) {
    this.institucionService
      .updateInstitucion(this.institucion, id)
      .subscribe((data) => {
        this.loadInstitucionesByTipId(1, 1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.instNombre + ' editado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstInstitucion(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} al instituto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.institucionService.updateEst(id, est).subscribe({
          next: () => {
            this.loadInstitucionesByTipId(1, 1);
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
        this.loadInstitucionesByTipId(1, 1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  loadInstitucionesByTipId(tipid: number, instid: number) {
    this.institucionService
      .getInstitucionesByTipId(tipid, instid)
      .subscribe((response) => {
        this.listaInstituciones = response; // Asigna los datos al array provincias
        this.loadExcelReportDataInstitucion(response)
      });
  }
  /*fin de Institucion*/

  /*Inicio de Tipo de Institucion*/
  saveTipoInstitucion() {
    this.tipInstitucionService
      .saveTipoInstitucion(this.tipInstitucion)
      .subscribe((data) => {
        this.loadTipoInstitucionByEstado(1);
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.tipNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearTipoInstitucion() {
    Swal.fire({
      title: 'Crear Nueva Institucion',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Tipo de Institución" [(ngModel)]="tipInstitucion.tipNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newTipoinstitucion = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newTipoinstitucion)) {
          this.tipInstitucion.tipNombre = this.newTipoinstitucion;
          this.saveTipoInstitucion();
          this.loadTipoInstitucionByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  openUpdateTipoInstitucion(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Tipo de Institución" [(ngModel)]="tipInstitucion.tipNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newTipoinstitucion = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        if (validarCadena(this.newTipoinstitucion)) {
          this.tipInstitucion.tipNombre = this.newTipoinstitucion;
          this.updateTipoInstitucion(id);
          this.loadTipoInstitucionByEstado(1);
          this.loadInstitucionesByTipId(1, this.institucion.instEstado);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateTipoInstitucion(id: number) {
    this.tipInstitucionService
      .updateTipoInstitucion(this.tipInstitucion, id)
      .subscribe((data) => {
        this.loadTipoInstitucionByEstado(1);
        this.loadInstitucionesByTipId(1, 1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.tipNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstTipoInstitucion(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} al usuario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipInstitucionService.updateEst(id, est).subscribe({
          next: () => {
            this.loadTipoInstitucionByEstado(1);
            this.loadInstitucionesByTipId(1, 1);
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
        this.loadTipoInstitucionByEstado(1);
        this.loadInstitucionesByTipId(1, this.institucion.instEstado);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  loadTipoInstitucionByEstado(est: number) {
    this.tipInstitucionService
      .getTipoInstitucionByEstado(est)
      .subscribe((response) => {
        this.listaTipoInstituciones = response; // Asigna los datos al array provincias
        this.loadExcelReportDataTipoInstitucion(response)
      });
  }
  /*fin de Tipo de Institucion*/

  loadExcelReportDataTipoInstitucion(data: TipoInstitucion[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Tipo De Instituciones";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "NOMBRE" },

    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.tipId,
      nombre: item.tipNombre

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

  loadExcelReportDataInstitucion(data: Institucion[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Instituciones";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "CÓDIGO" },
      { header: "NOMBRE" },
      { header: "DIRECCIÓN" },
      { header: "REFERENCIA" },
      { header: "PERTENECE A" }


    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.instId,
      codigo: item.instCodigo,
      nombre: item.instNombre,
      direccion: item.instDireccion,
      referencia: item.instReferencia,
      pertenece: item.tipId.tipNombre

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

  generateAndDownloadExcelTipoInstitucion(data: TipoInstitucion[]): void {
    this.loadExcelReportDataTipoInstitucion(data);
    this.downloadExcel();
  }

  generateAndDownloadExcelInstitucion(data: Institucion[]): void {
    this.loadExcelReportDataInstitucion(data);
    this.downloadExcel();
  }
}
