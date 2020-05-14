import { Injectable, Inject } from '@nestjs/common';
import { observable, Subscription, range, of, forkJoin, from } from 'rxjs';
import { map, filter, take, pluck, combineLatest, tap, delay, } from 'rxjs/operators';
import * as _ from 'lodash';
import { fs, vol } from 'memfs';
import * as f from 'fs'
import { ExcelService } from '@app/core/shared'
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class TestService {

    student = [
        { name: "sam", no: "123" },
        { name: "vivian", no: "124" },
        { name: "kkk", no: "999" }
    ]

    constructor(
        @Inject('ExcelFactory') private excelService: ExcelService,
        @InjectQueue('qe') private readonly testQueue: Queue

    ) {
        // this.test();
        this.test2();

    }

    async test2() {
        for (var i = 0; i < 100; i++) {
            await this.testQueue.add("sub",i);
        }
        console.log(await this.testQueue.getJobCounts())
    }

    test() {
        console.log("test");
        f.readFile(process.cwd() + '/assets/a.xlsx', (x, data) => {
            fs.writeFileSync('/hello.xlsx', data);
            var temp = fs.readFileSync('/hello.xlsx', { encoding: 'buffer' }); // World!
            var result = this.excelService.ReadExcelByBuffer(temp, 0);
            console.log(result)
        });


    }


}

