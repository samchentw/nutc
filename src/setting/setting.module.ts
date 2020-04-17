import { Module } from '@nestjs/common';
import { SettingController } from './controller/setting.controller';
import { SettingService } from './service/setting.service';
@Module({
    imports:[],
    controllers:[SettingController],
    providers:[ SettingService ]
})
export class SettingModule {}
