import { Module } from '@nestjs/common';
import { SettingController } from './controller/setting.controller';
import { SettingService } from './service/setting.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { SettingEntity } from './entity/setting.entity';
@Module({
    imports:[ TypeOrmModule.forFeature([SettingEntity]) ],
    controllers:[SettingController],
    providers:[ SettingService ]
})
export class SettingModule {}
