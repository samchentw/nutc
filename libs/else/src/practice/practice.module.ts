import { Module } from '@nestjs/common';
import { PracticeController } from './practice.controller';
import { TestService } from './service/test.service';
import { ExcelFactory } from '@app/core/shared';
@Module({
  controllers: [PracticeController],
  providers: [ TestService, ExcelFactory ] 
})
export class PracticeModule {}
