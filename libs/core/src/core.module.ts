import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { SettingModule } from './setting/setting.module';
@Module({
  imports:[
    SettingModule
  ],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
