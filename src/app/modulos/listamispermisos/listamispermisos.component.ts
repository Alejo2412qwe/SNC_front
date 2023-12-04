import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { base64PDFpreview } from 'src/app/common/base64';
import { IExcelReportParams, IHeaderItem } from 'src/app/interfaz/IExcelReportParams';
import { UploadEvent } from 'src/app/interfaz/UploadEvent';
import { Permisos } from 'src/app/modelo/permisos';
import { ExcelService } from 'src/app/services/excel.service';
import { PermisoService } from 'src/app/services/permiso.service';
import { ReportService } from 'src/app/services/report.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-listamispermisos',
  templateUrl: './listamispermisos.component.html',
  styleUrls: ['./listamispermisos.component.css'],
})
export class ListamispermisosComponent implements OnInit {
  constructor(
    private sessionStorage: SessionStorageService,
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
  permiso: Permisos = new Permisos();

  //VARIABLES
  newFunciones: string = '';
  estadoActivo: number = 1;
  excelReportData: IExcelReportParams | null = null;

  //LISTAS
  listapermisos: Permisos[] = [];
  uploadedFiles: File[] = [];

  calcularDiferenciaDias(fechaincio: string, fechafin: string) {
    const fechaInicio = new Date(fechaincio);
    const fechaFin = new Date(fechafin);

    let diferenciaDias = 0;
    let currentDate = new Date(fechaInicio); // Inicializa con una copia de la fecha de inicio

    while (currentDate <= fechaFin) {
      const dayOfWeek = currentDate.getDay();

      // Si el día no es sábado (6) ni domingo (0), incrementa la diferencia
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        diferenciaDias++;
      }

      currentDate.setDate(currentDate.getDate() + 1); // Avanza al siguiente día
    }

    return diferenciaDias;
  }

  calcularResultadoMultiplicado(fechaincio: string, fechafin: string) {
    const resultadoDiferenciaDias = this.calcularDiferenciaDias(fechaincio, fechafin);
    const resultadoMultiplicado = resultadoDiferenciaDias * 1.36363636363636;
    return resultadoMultiplicado;
  }

  calcularDiferenciaHoras(horainicio: string, horafin: string) {
    const horaInicio = new Date('1970-01-01 ' + horainicio);
    const horaFin = new Date('1970-01-01 ' + horafin);

    // Calculamos la diferencia en milisegundos
    const diferenciaMilisegundos = horaFin.getTime() - horaInicio.getTime();

    // Convertimos la diferencia a horas
    const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));

    return diferenciaHoras;
  }

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

  crearPDF(id: number) {
    this.permisoService.getPermisoById(id).subscribe((data) => {

      let fecha = new Date(data.permFechaEmision);
      console.log(fecha)
      const year = fecha.getFullYear();
      const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
      const day = ('0' + fecha.getDate()).slice(-2);

      let fechaFormateada = `${year}-${month}-${day}`;

      const doc = new jsPDF();
      doc.setFont('tahoma');
      doc.setFontSize(14);
      const imageUrl = 'assets/img/cabecera.png';
      doc.addImage(imageUrl, 'JPEG', 0, 0, 210, 20);// x, y, width, height
      doc.rect(0, 20, 210, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text('FORMULARIO DE LICENCIAS Y PERMISOS', 55, 26);

      doc.setFontSize(10);
      //para la fecha, provincia y regimen
      const anchoTotal = 140;
      const numCeldas = 4;

      // Calcular el ancho de cada celda
      const anchoCelda = anchoTotal / numCeldas;

      let xPosition = 0;

      // Celdas
      const celdas = [
        { label: 'FECHA', value: fechaFormateada },
        { label: 'PROVINCIA', value: data.usuId.usuPerId.ciuId.proId.proNombre },
        { label: 'RÉGIMEN', value: data.usuId.regId.regNombre }
        // Puedes agregar más celdas según tus necesidades
      ];

      /// Iterar sobre las celdas y agregarlas al PDF
      celdas.forEach((celda) => {
        // Establecer color de fondo y dibujar el rectángulo
        doc.setFillColor(35, 44, 88);
        doc.rect(xPosition, 30, anchoCelda, 10, 'FD');

        // Verificar si la etiqueta es FECHA, PROVINCIA o RÉGIMEN
        const isEtiquetaBlanca = ['FECHA', 'PROVINCIA', 'RÉGIMEN'].includes(celda.label);

        // Establecer color de texto para la etiqueta
        doc.setTextColor(isEtiquetaBlanca ? 255 : 0, isEtiquetaBlanca ? 255 : 255, isEtiquetaBlanca ? 255 : 255);
        doc.text(celda.label, xPosition + 1, 36);

        // Mover a la siguiente posición
        xPosition += anchoCelda;

        // Establecer color de fondo y dibujar el rectángulo para el valor
        doc.setFillColor(35, 44, 88);
        doc.rect(xPosition, 30, anchoCelda, 10, 'S');

        // Establecer color de texto negro para el valor de la celda
        doc.setTextColor(0, 0, 0);
        // Agregar el valor de la celda
        doc.text(celda.value, xPosition + 2, 36);

        // Mover a la siguiente posición para la próxima celda
        xPosition += anchoCelda;
      });

      doc.setFontSize(18);
      doc.setFillColor(35, 44, 88);
      doc.rect(0, 40, 210, 10, 'FD');// F significa relleno, D significa borde
      doc.setTextColor(255, 255, 255);
      doc.text('DATOS DEL SERVIDOR/TRABAJADOR', 45, 47);
      doc.setTextColor(0, 0, 0);
      doc.rect(0, 50, 42, 20, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.setFontSize(9);
      doc.text('APELLIDOS Y NOMBRES:', 1, 54);
      doc.setFontSize(12);
      doc.rect(42, 50, 62, 20, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text(data.usuId.usuPerId.perApellido + ' ' + data.usuId.usuPerId.perNombre, 44, 62);
      doc.rect(104, 50, 42, 20, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.setFontSize(9);
      doc.text('CÉDULA DE CIUDADANÍA:', 105, 54);
      doc.setFontSize(12);
      doc.rect(146, 50, 70, 20, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text(data.usuId.usuPerId.perCedula, 165, 62);
      doc.rect(0, 70, 125, 20, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.setFontSize(9);
      doc.text('COORDINACIÓN / GERENCIA / PROYECTO:', 1, 74);
      doc.setFontSize(12);
      doc.text(data.usuId.zonId.zonNombre, 50, 84);
      doc.setFontSize(9);
      doc.rect(125, 70, 210, 20, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text('DIRECCIÓN O UNIDAD:', 126, 74);
      doc.setFontSize(12);
      doc.text(data.usuId.funId.funNombre, 176, 84);
      doc.setFillColor(35, 44, 88);
      doc.rect(0, 90, 150, 10, 'FD');// F significa relleno, D significa borde
      doc.setTextColor(255, 255, 255);
      doc.text('MOTIVO:', 52, 96);
      doc.setTextColor(0, 0, 0);
      doc.setFillColor(35, 44, 88);
      doc.rect(150, 90, 120, 10, 'FD');// F significa relleno, D significa borde
      doc.setTextColor(255, 255, 255);
      doc.text('FECHA DEL PERMISO:', 157, 96);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(7);
      doc.rect(0, 100, 150, 50, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(0, 100, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(0, 110, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(0, 120, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(0, 130, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(0, 140, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text('LICENCIA POR CALAMIDAD DOMÉSTICA', 11, 105);
      doc.text('LICENCIA POR ENFERMEDAD', 11, 115);
      doc.text('LICENCIA POR MATERNIDAD', 11, 125);
      doc.text('LICENCIA POR MATRIMONIO O UNIÓN DE HECHO', 11, 135);
      doc.text('LICENCIA POR PATERNIDAD', 11, 145);

      doc.rect(70, 100, 150, 50, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(70, 100, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(70, 110, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(70, 120, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(70, 130, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(70, 140, 10, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text('PERMISO PARA ESTUDIOS REGULARES', 82, 105);
      doc.text('PERMISO DE DÍAS CON CARGO A VACACIONES', 82, 115);
      doc.text('PERMISO POR ASUNTOS OFICIALES', 82, 125);
      doc.text('PERMISO PARA ATENCIÓN MÉDICA', 82, 135);
      doc.text('OTROS', 82, 145);

      doc.setFontSize(12);
      if (data.motId.motId === 1) {
        doc.text('X', 3, 107);
      } else if (data.motId.motId === 2) {
        doc.text('X', 3, 117);
      } else if (data.motId.motId === 3) {
        doc.text('X', 3, 127);
      } else if (data.motId.motId === 4) {
        doc.text('X', 3, 137);
      } else if (data.motId.motId === 5) {
        doc.text('X', 3, 147);
      } else if (data.motId.motId === 6) {
        doc.text('X', 73, 107);
      } else if (data.motId.motId === 7) {
        doc.text('X', 73, 117);
      } else if (data.motId.motId === 8) {
        doc.text('X', 73, 127);
      } else if (data.motId.motId === 9) {
        doc.text('X', 73, 137);
      } else if (data.motId.motId === 10) {
        doc.text('X', 73, 147);
      }

      doc.rect(150, 100, 30, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(180, 100, 30, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(150, 110, 30, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(180, 110, 30, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.setFillColor(35, 44, 88);
      doc.rect(150, 120, 60, 10, 'FD');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(150, 130, 30, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(180, 130, 30, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.setFontSize(8);
      doc.text('DESDE (aaaa/mm/dd)', 152, 105);
      doc.text('HASTA (aaaa/mm/dd)', 182, 105);
      doc.setFontSize(10);

      if (data.permFechaInicio) {
        doc.text(data.permFechaInicio, 155, 115);
      } else {
        doc.text('N/A', 160, 145);
      }
      if (data.permFechaFin) {
        doc.text(data.permFechaFin, 185, 115);
      } else {
        doc.text('N/A', 190, 145);
      }

      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text('EN CASO DE HORAS', 157, 125);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(8);
      doc.text('DESDE (hh:mm)', 152, 135);
      doc.text('HASTA (hh:mm)', 182, 135);
      doc.rect(150, 140, 30, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(180, 140, 30, 10, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.setFontSize(10);

      if (data.permHorasInicio) {
        doc.text(data.permHorasInicio, 160, 145);
      } else {
        doc.text('N/A', 160, 145);
      }
      if (data.permHorasFin) {
        doc.text(data.permHorasFin, 190, 145);
      } else {
        doc.text('N/A', 190, 145);
      }

      doc.setFontSize(12);
      doc.setFillColor(35, 44, 88);
      doc.rect(0, 150, 150, 10, 'FD');// F significa relleno, D significa borde
      doc.setTextColor(255, 255, 255);
      doc.text('OBSERVACIONES O JUSTIFICATIVOS:', 40, 155);
      doc.setTextColor(0, 0, 0);
      doc.text(data.permObservacion, 1, 165);
      doc.setFontSize(7);
      doc.setFillColor(35, 44, 88);
      doc.rect(150, 150, 120, 10, 'FD');// F significa relleno, D significa borde
      doc.setTextColor(255, 255, 255);
      doc.text('TIEMPO SOLICITADO ', 168, 153);
      doc.text('DIAS', 160, 157);
      doc.text('HORAS', 190, 157);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(this.calcularDiferenciaDias(data.permFechaInicio, data.permFechaFin).toString(), 162, 164);
      doc.text(this.calcularDiferenciaHoras(data.permHorasInicio, data.permHorasFin).toString(), 192, 164);
      doc.setFontSize(7);

      //ajuste para que este dentro del cuadrado
      const marco4 = {
        x: 151,
        y: 164,
        width: 60,  // Ajusta según el ancho deseado del marco
        height: 25  // Ajusta según la altura deseada del marco
      };

      const texto4 = 'VALOR A DESCONTAR (' + this.calcularResultadoMultiplicado(data.permFechaInicio, data.permFechaFin).toString() + ') EL TIEMPO SOLICITADO MULTIPLICA POR 1,36363636363636';

      // Dividir el texto para ajustarlo al marco
      const textoDividido4 = doc.splitTextToSize(texto4, marco4.width);

      // Obtener dimensiones del texto dividido
      const dimensiones4 = doc.getTextDimensions(textoDividido4);

      // Calcular la posición y para centrar verticalmente el texto en el marco
      const posY4 = marco4.y + (marco4.height - dimensiones4.h) / 2;

      // Agregar el texto ajustado al marco
      doc.text(textoDividido4, marco4.x, posY4);
      doc.rect(0, 160, 150, 30, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(150, 160, 30, 5, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(180, 160, 30, 5, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(150, 185, 60, 5, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text(data.motId.motDescripcionCorta, 151, 188);
      doc.setFontSize(10);
      doc.rect(0, 190, 70, 5, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(70, 190, 70, 5, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(140, 190, 70, 5, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text('SOLICITA ', 28, 194);
      doc.text('APRUEBA ', 97, 194);
      doc.text('REGISTRA ', 167, 194);
      doc.setFontSize(14);
      //ajuste para que este dentro del cuadrado
      const marco5 = {
        x: 2,
        y: 195,
        width: 70,  // Ajusta según el ancho deseado del marco
        height: 25  // Ajusta según la altura deseada del marco
      };

      const texto5 = data.usuId.usuPerId.perApellido + ' ' + data.usuId.usuPerId.perNombre;

      // Dividir el texto para ajustarlo al marco
      const textoDividido5 = doc.splitTextToSize(texto5, marco5.width);

      // Obtener dimensiones del texto dividido
      const dimensiones5 = doc.getTextDimensions(textoDividido5);

      // Calcular la posición y para centrar verticalmente el texto en el marco
      const posY5 = marco5.y + (marco5.height - dimensiones5.h) / 2;

      // Agregar el texto ajustado al marco
      doc.text(textoDividido5, marco5.x, posY5);
      doc.setFontSize(10);
      doc.rect(0, 195, 70, 25, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(70, 195, 70, 25, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(140, 195, 70, 25, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text('NOMBRE Y FIRMA:', 71, 199);

      doc.rect(0, 200, 70, 25, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(70, 200, 70, 25, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.rect(140, 200, 70, 25, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.text('Servidor/Trabajador', 20, 224);
      doc.text('Jefe Inmediato', 93, 224);
      doc.text('Talento Humano', 163, 224);
      doc.setFillColor(35, 44, 88);
      doc.rect(0, 225, 60, 5, 'FD');// F significa relleno, D significa borde
      doc.setTextColor(255, 255, 255);
      doc.text('TIPO DE PERMISO:', 17, 229);
      doc.setTextColor(0, 0, 0);
      doc.rect(0, 230, 60, 25, 'S');// x, y, width, height, style (S significa 'stroke' o borde)
      doc.setFillColor(35, 44, 88);
      doc.rect(60, 225, 210, 5, 'FD');// F significa relleno, D significa borde
      doc.setTextColor(255, 255, 255);
      doc.text('DESCRIPCIÓN', 127, 229);
      doc.setTextColor(0, 0, 0);
      doc.rect(60, 230, 210, 25, 'S');// x, y, width, height, style (S significa 'stroke' o borde)

      //ajuste para que este dentro del cuadrado
      const marco = {
        x: 2,
        y: 230,
        width: 60,  // Ajusta según el ancho deseado del marco
        height: 25  // Ajusta según la altura deseada del marco
      };

      const texto = data.tiPeId.tiPeNombre;

      // Dividir el texto para ajustarlo al marco
      const textoDividido = doc.splitTextToSize(texto, marco.width);

      // Obtener dimensiones del texto dividido
      const dimensiones = doc.getTextDimensions(textoDividido);

      // Calcular la posición y para centrar verticalmente el texto en el marco
      const posY = marco.y + (marco.height - dimensiones.h) / 2;

      // Agregar el texto ajustado al marco
      doc.text(textoDividido, marco.x, posY);

      doc.setFontSize(8);
      const marco2 = {
        x: 61,
        y: 233,
        width: 149,
        height: 25
      };

      const texto2 = data.motId.motDescripcionLarga;

      const textoDividido2 = doc.splitTextToSize(texto2, marco2.width);

      const dimensiones2 = doc.getTextDimensions(textoDividido2);

      const posY2 = marco2.y + (marco2.height - dimensiones2.h) / 2;


      doc.text(textoDividido2, marco2.x, posY2);

      doc.setFontSize(12);
      doc.setFillColor(35, 44, 88);
      doc.rect(0, 255, 210, 20, 'FD');// F significa relleno, D significa borde

      const marco3 = {
        x: 5,
        y: 258,
        width: 210,
        height: 20
      };

      const texto3 = 'Todo formulario de permiso / licencia, deberá ser presentado a la Dirección de Talento Humano con su respectiva justificación, máximo en los tres días posteriores a la emisión del mismo, caso contrario el formulario será nulo y se descontará directamente de vacaciones.';

      const textoDividido3 = doc.splitTextToSize(texto3, marco3.width);

      const dimensiones3 = doc.getTextDimensions(textoDividido3);

      const posY3 = marco3.y + (marco3.height - dimensiones3.h) / 2;


      doc.setTextColor(255, 255, 255);
      doc.text(textoDividido3, marco3.x, posY3);
      doc.setTextColor(0, 0, 0);

      const imageUrl2 = 'assets/img/pie.png';
      doc.addImage(imageUrl2, 'JPEG', 52, 278, 100, 15);// x, y, width, height

      doc.save('permiso_' + data.usuId.usuPerId.perCedula + '_' + data.usuId.usuPerId.perApellido + '.pdf');

    })
  }

}
