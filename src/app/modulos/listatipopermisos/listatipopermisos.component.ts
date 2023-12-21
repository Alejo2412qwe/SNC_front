import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { showErrorAlCrear, validarCadena } from 'src/app/common/validaciones';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { TipoPermiso } from 'src/app/modelo/tipopermiso';
import { ExcelService } from 'src/app/services/excel.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { TipoPermisoService } from 'src/app/services/tipopermiso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listatipopermisos',
  templateUrl: './listatipopermisos.component.html',
  styleUrls: ['./listatipopermisos.component.css'],
})
export class ListatipopermisosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
    private tipopermisoService: TipoPermisoService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.cargarTipoPermisos();
    this.loadTipoPermisoByEstado(1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //listas
  listaTipoPermisos: TipoPermiso[] = [];

  //variables
  TipoPermiso: TipoPermiso = new TipoPermiso();
  newTipoPermiso: string = '';
  newDescripcion: string = '';
  searchString: string = '';
  excelReportData: IExcelReportParams | null = null;

  cargarTipoPermisos() {
    this.tipopermisoService.getAllTiposPermiso().subscribe((data) => {
      this.listaTipoPermisos = data;
      this.loadExcelReportData(data);
    });
  }

  searchTipopermiso(search: string, est: number) {
    this.tipopermisoService.searchTipopermiso(search, est).subscribe((data) => {
      this.listaTipoPermisos = data
      this.loadExcelReportData(data);
    })
  }

  loadTipoPermisoByEstado(est: number) {
    this.tipopermisoService
      .getTipoPermisoByEstado(est)
      .subscribe((response) => {
        this.listaTipoPermisos = response; // Asigna los datos al array Funciones
      });
  }

  saveTiposPermiso() {
    this.tipopermisoService
      .saveTipoPermiso(this.TipoPermiso)
      .subscribe((data) => {
        this.loadTipoPermisoByEstado(1);
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.tiPeNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearTipoPermiso() {
    Swal.fire({
      title: 'Crear Nuevo Tipo de Permiso',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Ingrese el tipo de permiso" [(ngModel)]="TipoPermiso.tiPeNombre"> <input id="swal-input2" class="swal2-input" placeholder="Descripción" [(ngModel)]="TipoPermiso.tiPeDescripcion">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newTipoPermiso = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        this.newDescripcion = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        if (
          validarCadena(this.newTipoPermiso) &&
          validarCadena(this.newDescripcion)
        ) {
          this.TipoPermiso.tiPeDescripcion = this.newDescripcion;
          this.TipoPermiso.tiPeNombre = this.newTipoPermiso;
          this.saveTiposPermiso();
          this.loadTipoPermisoByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  openUpdateTipoPermiso(nombre: string, id: number) {
    this.tipopermisoService.getTipoPermsioById(id).subscribe((data) => {
      Swal.fire({
        title: 'Editar ' + nombre,
        html: `
        <input id="swal-input1" class="swal2-input" placeholder="Ingrese el tipo de permiso" [(ngModel)]="TipoPermiso.tiPeNombre" value="${data.tiPeNombre}"> 
        <input id="swal-input2" class="swal2-input" placeholder="Descripción" [(ngModel)]="TipoPermiso.tiPeDescripcion" value="${data.tiPeDescripcion}">
        `,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          this.newTipoPermiso = (
            document.getElementById('swal-input1') as HTMLInputElement
          ).value;
          this.newDescripcion = (
            document.getElementById('swal-input2') as HTMLInputElement
          ).value;
          if (
            validarCadena(this.newTipoPermiso) &&
            validarCadena(this.newDescripcion)
          ) {
            this.TipoPermiso.tiPeDescripcion = this.newDescripcion;
            this.TipoPermiso.tiPeNombre = this.newTipoPermiso;
            this.updateTipoPermiso(id);
            this.loadTipoPermisoByEstado(1);
          } else {
            showErrorAlCrear();
          }
        },
      });
    })
  }

  updateTipoPermiso(id: number) {
    this.tipopermisoService
      .updateTipoPermiso(this.TipoPermiso, id)
      .subscribe((data) => {
        this.loadTipoPermisoByEstado(1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.tiPeNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstTipoPermiso(id: number, est: number) {
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
        this.tipopermisoService.updateEst(id, est).subscribe({
          next: () => {
            this.loadTipoPermisoByEstado(1);
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
        this.loadTipoPermisoByEstado(1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  loadExcelReportData(data: TipoPermiso[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Tipo De Formularios";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "NOMBRE" },
      { header: "DESCRIPCIÓN" }


    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.tiPeId,
      nombre: item.tiPeNombre,
      desc: item.tiPeDescripcion

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
