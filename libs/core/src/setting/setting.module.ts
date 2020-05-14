import { Module } from '@nestjs/common';
import { SettingController } from './controller/setting.controller';
import { SettingService } from './service/setting.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Setting } from './entity/setting.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Setting])],
    controllers: [SettingController],
    providers: [SettingService]
})
export class SettingModule { }
