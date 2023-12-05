import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { LOGO } from '../common/img64'
import { IExcelReportParams } from '../interfaz/IExcelReportParams';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }
  private workbook!: Workbook;

  async dowloadExcel(params: IExcelReportParams): Promise<void> {
    this.workbook = new Workbook();

    this.workbook.creator = 'Senescyt';

    // add a worksheet
    const worksheet = this.workbook.addWorksheet(params.reportName,
      {
        properties: { tabColor: { argb: '177B487B' } },
      });

    // columns
    const columns = params.headerItems

    worksheet.mergeCells("A1:F1");
    worksheet.mergeCells("G1:L1");
    worksheet.getRow(1).height = 70;
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }


    const customCell = worksheet.getCell("A1");
    customCell.font = {
      name: "Times New Roman",
      family: 4,
      size: 26,
      underline: false,
      bold: true
    };


    customCell.value = params.reportName;


    // insert logo
    const base64LogoContent = LOGO
    const logo = this.workbook.addImage({
      base64: base64LogoContent,
      extension: 'png'
    });



    worksheet.addImage(logo, params.logo);




    const headerRow = worksheet.getRow(2);
    headerRow.height = 20;
    headerRow.font = {
      name: "Times New Roman", size: 12,
      bold: true, color: { argb: 'FFFFFFFF' }
    };
    headerRow.alignment = { horizontal: "center", vertical: "middle" }
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      // fgColor: { argb: '871B1B' }

      fgColor: { argb: '182F5D' }
    }
    for (let i = 0; i < columns.length; i++) {
      const currentColumnWidth = columns[i].width;
      worksheet.getColumn(i + 1).width = currentColumnWidth !== undefined ? currentColumnWidth : 20;
      const cell = headerRow.getCell(i + 1);
      cell.value = columns[i].header;
    }
    worksheet.autoFilter = {
      from: 'A4',
      to: {
        row: 2,
        column: columns.length
      }
    }

    worksheet.views = [{ state: "frozen", ySplit: 2 }];





    // insert data
    if (params.reportName === 'Usuarios') {
      for (let i = 0; i < params.rowData.length; i++) {
        const base64Image = params.rowData[i].foto.replace(/^data:.*,/, "");
        params.rowData[i].foto = '';

        let currentCount = 0;

        currentCount = i + 1

        const dataRow = worksheet.getRow(2 + currentCount);
        dataRow.outlineLevel = 1;
        dataRow.alignment = { vertical: 'middle', horizontal: 'center' }
        dataRow.values = Object.values(params.rowData[i]);

        dataRow.font = {
          name: "Times New Roman",
          size: 12,

        }
        dataRow.border = {
          top: { style: 'thin', color: { argb: 'B0252A' } },
          // left: { style: 'thin', color: { argb: 'B0252A' } },
          bottom: { style: 'thin', color: { argb: 'B0252A' } },
          // right: { style: 'thin', color: { argb: 'B0252A' } },
        }
        // alert(base64Image)
        const imageId = this.workbook.addImage({
          base64: base64Image,
          extension: 'jpeg', // Cambia la extensión según el formato de la imagen
        });

        // const position = 'B' + (2 + currentCount) + ':' + 'B' + (2 + currentCount);
        // alert(position)
        // worksheet.addImage(imageId, position);
        worksheet.addImage(imageId, {
          tl: { col: 1.1, row: 1.1 + currentCount }, // top-left cell
          ext: { width: 75, height: 80 }, // image dimensions
        });
        worksheet.getRow(2 + currentCount).height = 62;
        worksheet.getColumn('B').width = 12;
      }

    } else {
      for (let i = 0; i < params.rowData.length; i++) {
        const currentCount = i + 1
        const dataRow = worksheet.getRow(2 + currentCount);
        dataRow.outlineLevel = 1;
        dataRow.alignment = { vertical: 'middle', horizontal: 'center' }
        dataRow.values = Object.values(params.rowData[i]);

        dataRow.font = {
          name: "Times New Roman",
          size: 12,

        }
        dataRow.border = {
          top: { style: 'thin', color: { argb: 'B0252A' } },
          // left: { style: 'thin', color: { argb: 'B0252A' } },
          bottom: { style: 'thin', color: { argb: 'B0252A' } },
          // right: { style: 'thin', color: { argb: 'B0252A' } },
        }
      }
    }
    this.workbook.xlsx.writeBuffer().then(function (buffer) {
      const fecha = new Date();
      const dia = fecha.getDate().toString().padStart(2, '0'); // Garantiza 2 dígitos con un 0 adelante si es necesario
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Garantiza 2 dígitos con un 0 adelante si es necesario
      const anio = fecha.getFullYear();

      const cadena = params.reportName ? `Reporte _ ${params.reportName}_${dia}-${mes}-${anio}`
        : `Reporte _ ${params.reportName}`;

      fs.saveAs(
        new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
        cadena
      )
    })
  }

}
