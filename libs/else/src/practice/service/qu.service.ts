import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MessageDto } from '@app/core/shared';
import * as _ from 'lodash';
@Processor('qe')
export class QeService {
    constructor(
    ) {

    }
    // private readonly logger = new Logger(AudioProcessor.name);
    // constructor(){this.handleTranscode}
    @Process('sub')
    async handleTranscode(job: Job) {
        console.log( job.data)
        
        // console.log(job.progress())
    }
}