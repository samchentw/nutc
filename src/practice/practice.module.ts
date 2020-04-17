import { Module } from '@nestjs/common';
import { PracticeController } from './practice.controller';
import { TestService } from './service/test.service';

@Module({
  controllers: [PracticeController],
  providers: [ TestService ] 
})
export class PracticeModule {}
