import { Injectable, Inject } from '@nestjs/common';
import * as _ from 'lodash';

import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidationPipe, ExcelService, ExcelOption, ExcelType } from '../../shared';
@Injectable()
export class TestService {
    constructor(
        @Inject('ExcelFactory') private ExcelService: ExcelService,
    ) {
        // this.testExcel();
        // this.testReadExcel();
    }


    testExcel() {
        const data = [
            { a: "1", b: "2" },
            { a: "3", b: "你好" }
        ];

        const data1 = [
            { c: "1", 測試: "2" },
            { c: "4", 測試: "你好" }
        ];

        let input: ExcelOption = new ExcelOption();
        input.excelName = "test";
        input.excelType = ExcelType.XLSX;
        input.sheetData = [];
        input.sheetData.push({ sheetName: "aaa", data: data }, { sheetName: "bbb", data: data1 })
        return this.ExcelService.ExportExcel(input);
    }


    testReadExcel() {
        var temp = this.ExcelService.ReadExcel("test", 0);
        console.log(temp);
    }


}