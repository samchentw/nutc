import { Module } from '@nestjs/common';
import { UsersModule } from '@app/identity/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from './entity/consumer.entity';
import { ConsumerService } from './service/consumer.service';
import { ConsumerController } from './controller/consumer.controller';
@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([Consumer])
    ],
    controllers: [
        ConsumerController
    ],
    providers: [
        ConsumerService
    ],
    exports: [ConsumerService]
})
export class ConsumerModule { }
