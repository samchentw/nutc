import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as express from 'express';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

export const ExcelFactory = {
    provide: "ExcelFactory",
    useFactory: () => {
        return new ExcelService();
    }
}
export enum ExcelType {
    XLSX = 0,
    XLS = 1
}

export class ExcelOption {
    excelType: ExcelType;
    excelName: string;
    sheetData: SheetData[];
}

export class SheetData {
    sheetName: string;
    data: any[];
}

@Injectable()
export class ExcelService {

    public ExportExcel(input: ExcelOption) {
        let sheetName = [];
        let sheetData = {};
        let bookType: XLSX.BookType = "xlsx";
        input.sheetData.forEach(sheet => {
            let worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheet.data);
            sheetName.push(sheet.sheetName);
            sheetData[sheet.sheetName] = worksheet;
        });

        const workbook: XLSX.WorkBook = { Sheets: sheetData, SheetNames: sheetName };
        switch (input.excelType) {
            case ExcelType.XLS:
                bookType = 'xls';
                break;
            case ExcelType.XLSX:
                bookType = 'xlsx';
                break;
        }
        const excelBuffer = XLSX.write(workbook, { bookType: bookType, type: 'buffer' });
        return excelBuffer;
    }

    public saveAsExcelFile(input: ExcelOption, filePath: string): void {
        var buffer = this.ExportExcel(input);
        let data = Buffer.from(buffer);

        switch (input.excelType) {
            case ExcelType.XLS:
                filePath += '.xls';
                break;
            case ExcelType.XLSX:
                filePath += '.xlsx';
                break;
        }
        var writerStream = fs.createWriteStream(`${filePath}`);
        writerStream.write(data, 'UTF8');
        writerStream.end();
    }

    public ReadExcel(FileName: string, sheetIndex: number): any[] {
        var data: string = `${FileName}.xlsx`;
        var workbook = XLSX.readFile(data, { type: "array", cellHTML: false, cellFormula: false });
        var sheetNames = workbook.SheetNames;
        var worksheet = workbook.Sheets[sheetNames[sheetIndex]];
        return XLSX.utils.sheet_to_json(worksheet);
    }

    public ReadExcelByBuffer(Buffer: any, sheetIndex: number) {
        var workbook = XLSX.read(Buffer);
        var sheetNames = workbook.SheetNames;
        var worksheet = workbook.Sheets[sheetNames[sheetIndex]];
        return XLSX.utils.sheet_to_json(worksheet);
    }
}