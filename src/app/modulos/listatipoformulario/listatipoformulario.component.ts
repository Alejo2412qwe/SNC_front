import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { showErrorAlCrear, validarCadena } from 'src/app/common/validaciones';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { TipoFormulario } from 'src/app/modelo/tipoformulario';
import { ExcelService } from 'src/app/services/excel.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { TipoFormularioService } from 'src/app/services/tipoformulario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listatipoformulario',
  templateUrl: './listatipoformulario.component.html',
  styleUrls: ['./listatipoformulario.component.css'],
})
export class ListatipoformularioComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
    private tipformularioService: TipoFormularioService,
    private excelService: ExcelService
  ) { }
  ngOnInit(): void {
    this.cargarTipoForm();
    this.loadTipoFormByEstado(1);
  }

  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');

  //listas
  listatipoformulario: TipoFormulario[] = [];

  //variables
  TipoFormulario: TipoFormulario = new TipoFormulario();
  newTipoFormulario: string = '';
  excelReportData: IExcelReportParams | null = null;

  cargarTipoForm() {
    this.tipformularioService.getAllTipoFormulario().subscribe((data) => {
      this.listatipoformulario = data;
    });
  }

  loadTipoFormByEstado(est: number) {
    this.tipformularioService
      .getTipoFormularioByEstado(est)
      .subscribe((response) => {
        this.listatipoformulario = response; // Asigna los datos al array Funciones
        this.loadExcelReportData(response)
      });
  }

  saveTipoForm() {
    this.tipformularioService
      .saveTipoFormulario(this.TipoFormulario)
      .subscribe((data) => {
        this.loadTipoFormByEstado(1);
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: data.tiFoNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  openCrearTipoForm() {
    Swal.fire({
      title: 'Crear Nuevo Tipo de Permiso',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Ingrese el tipo de formulario" [(ngModel)]="TipoFormulario.tiFoNombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newTipoFormulario = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;

        if (validarCadena(this.newTipoFormulario)) {
          this.TipoFormulario.tiFoNombre = this.newTipoFormulario;
          this.saveTipoForm();
          this.loadTipoFormByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  openUpdateTipoForm(nombre: string, id: number) {
    Swal.fire({
      title: 'Editar ' + nombre,
      html: '<input id="swal-input1" class="swal2-input" placeholder="Ingrese el tipo de formulario" [(ngModel)]="TipoFormulario.tiFoNombre">',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        this.newTipoFormulario = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;

        if (validarCadena(this.newTipoFormulario)) {
          this.TipoFormulario.tiFoNombre = this.newTipoFormulario;
          this.updateTipoForm(id);
          this.loadTipoFormByEstado(1);
        } else {
          showErrorAlCrear();
        }
      },
    });
  }

  updateTipoForm(id: number) {
    this.tipformularioService
      .updateTipoFormulario(this.TipoFormulario, id)
      .subscribe((data) => {
        this.loadTipoFormByEstado(1);
        Swal.fire({
          title: 'Edición Exitosa!',
          text: data.tiFoNombre + ' agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Confirmar',
          showCancelButton: false, // No mostrar el botón de cancelar
        });
      });
  }

  updateEstTipoForm(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} al tipo de formulario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipformularioService.updateEst(id, est).subscribe({
          next: () => {
            this.loadTipoFormByEstado(1);
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
        this.loadTipoFormByEstado(1);
        this.toastr.warning('Acción Cancelada');
      }
    });
  }

  loadExcelReportData(data: TipoFormulario[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Tipo De Formularios";

    //TAMAÑO DEL LOGO
    const logo = "G1:L1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "NOMBRE" }

    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      noRegistro: item.tiFoId,
      codigo: item.tiFoNombre

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
