import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Date_String, calcularEdad } from 'src/app/common/validaciones';
import { Persona } from 'src/app/modelo/persona';
import { Usuario } from 'src/app/modelo/usuario';
import { PersonaService } from 'src/app/services/persona.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { decodeBase64Download } from '../../common/base64';
import { decodeBase64PDF } from '../../common/base64';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { ExcelService } from 'src/app/services/excel.service';
import { USER } from 'src/app/common/img64';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

  usuariosAct: Persona[] = [];

  constructor(private serper: PersonaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private excelService: ExcelService,

    //SERVICES
    private usuarioService: UsuarioService, private toastr: ToastrService, private sessionStorage: SessionStorageService,) {
    this.estList = 1;
  }

  ngOnInit(): void {
    this.setActive()
    this.loadUsers(this.estList);
  }
  username = this.sessionStorage.getItem('username');
  rol = this.sessionStorage.getItem('rol');
  searchString: string = '';
  listUsers: Usuario[] = [];
  estList: number = 1; // Inicialmente establecido en 1 para "Activo"
  userImg = USER
  excelReportData: IExcelReportParams | null = null;


  updateSelection(value: number) {
    this.estList = value;
  }
  setActive() {
    this.estList = 1; // Cambia el valor de estList a 1
  }
  calcularEdad(fechaNacimiento: Date) {
    return calcularEdad(fechaNacimiento)
  }


  loadUsers(est: number) {
    this.usuarioService.allUsersData(est).subscribe((response) => {
      this.listUsers = response; // Asigna los datos al array provincias
      this.loadExcelReportData(response);
    });
  }

  searchUser(search: string, est: number) {
    this.usuarioService.searchUsersData(search, est).subscribe((response) => {
      this.listUsers = response;
      this.loadExcelReportData(response);

    });
  }

  updateEstUser(id: number, est: number) {
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
        this.usuarioService.updateEst(id, est).subscribe({
          next: () => {
            this.loadUsers(est)
            this.estList = est;
            if (est === 0) {
              this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
            } else {
              this.toastr.success('ACTIVADO CORRECTAMENTE', 'ÉXITO');
            }
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {
            // Manejar completado
          }
        });
      }
    });
  }



  loadExcelReportData(data: Usuario[]) {

    //NOMBRE DEL REPORTE
    const reportName = "Usuarios";

    //TAMAÑO DEL LOGO
    const logo = "G1:J1";

    //ENCABEZADOS
    const headerItems: IHeaderItem[] = [
      { header: "№ REGISTRO" },
      { header: "FOTO" },
      { header: "ID BIOMETRICO" },
      { header: "CÉDULA" },
      { header: "NOMBRES" },
      { header: "APELLIDOS" },
      { header: "CORREO" },
      { header: "FECHA DE NACIMIENTO" },
      { header: "EDAD" },
      { header: "CIUDAD | PROVINCIA" },
      { header: "TELÉFONO" },
      { header: "DIRECCIÓN" },
      { header: "INSTITUCION" },
      { header: "PROCESO" },
      { header: "SUBPROCESO" },
      { header: "FUNCION" },
      { header: "REGIÓN" },
      { header: "ZONAL" },
      { header: "HORARIO" },
      { header: "ROL" },
      { header: "FECHA DE REGISTRO" },
      { header: "" },
    ];

    //DATOS DEL REPORTE
    const rowData = data.map((item) => ({
      idUser: item.usuId,
      foto: item.foto,
      usuIdLector: item.usuIdLector,
      perCedula: item.usuPerId?.perCedula,
      perNombre: item.usuPerId?.perNombre,
      perApellido: item.usuPerId?.perApellido,
      usuCorreo: item.usuCorreo,
      perFechaNacimiento: item.usuPerId.perFechaNacimiento,
      edad: calcularEdad(item.usuPerId.perFechaNacimiento),
      ciuNombre: `${item.usuPerId.ciuId.ciuNombre} - ${item.usuPerId.ciuId.proId.proNombre}`,
      perTelefono: item.usuPerId.perTelefono,
      perDireccion: item.usuPerId.perDireccion,
      instNombre: item.insId.instNombre,
      procNombre: item.subId.procId.procNombre,
      subProcNombre: item.subId.subNombre,
      funNombre: item.funId.funNombre,
      regNombre: item.regId.regNombre,
      zonNombre: item.zonId.zonNombre,
      horario: `Entrada: ${item.horId.horHoraIngresoDia || '00:00'} \n- Salida: ${item.horId.horHoraSalidaTarde || '00:00'}`,
      rolNombre: item.rolId.rolNombre,
      usuFechaRegistro: Date_String(item.usuFechaRegistro.toString()),
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
    this.loadUsers(this.estList)
  }



  downloadImage(base64Data: string, name: string) {
    decodeBase64Download(base64Data, name, this.toastr)
  }


  downloadFile(base64Data: string, name: string) {
    decodeBase64PDF(base64Data, name, this.toastr)
  }



}



