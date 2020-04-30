import { Injectable } from '@nestjs/common';
import { Cron,SchedulerRegistry } from '@nestjs/schedule';
@Injectable()
export class CmsJob{
    constructor(
        private readonly schedulerRegistry: SchedulerRegistry,        
    ) {
        
    }

    cancel(){
        const job = this.schedulerRegistry.getCronJob('notifications');
        job.stop();
    }

    @Cron('0 29 * * * *',{
        name: 'notifications',
    })
    handleCron() {      
     console.log('job is working!!');
    }
}