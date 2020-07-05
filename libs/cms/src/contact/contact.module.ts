import { Module } from '@nestjs/common';
import { ContactController } from './controller/contact.controller';
import { Contact } from './entity/contact.entity';
import { ContactService } from './service/contact.service';
import { FileModule } from '@app/core/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        FileModule,
        TypeOrmModule.forFeature([Contact])
    ],
    controllers: [
        ContactController
    ],
    providers: [
        ContactService,
    ]
})
export class ContactModule { }
