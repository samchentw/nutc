import { Module } from '@nestjs/common';
import { PracticeController } from './practice.controller';
import { TestService } from './service/test.service';
import { ExcelFactory } from '@app/core/shared';
import { BullModule } from '@nestjs/bull';
import { QeService } from './service/qu.service';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'qe'
    }),
  ],
  controllers: [PracticeController],
  providers: [ExcelFactory, QeService, TestService]
})
export class PracticeModule { }
