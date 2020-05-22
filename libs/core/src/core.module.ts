import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { SettingModule } from './setting/setting.module';
import { FileModule } from './file/file.module';
import { TreeModule } from './tree/tree.module';
@Module({
  imports:[
    SettingModule,
    FileModule,
    TreeModule,
  ],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
