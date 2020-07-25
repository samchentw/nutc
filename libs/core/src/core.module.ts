import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { SettingModule } from './setting/setting.module';
import { FileModule } from './file/file.module';
@Module({
  imports:[
    SettingModule,
    FileModule
  ],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
