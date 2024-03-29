import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';
import { FileService } from './service/file.service';
import { UploadFactory } from '@app/core/shared';
import { File } from './entity/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [
        TypeOrmModule.forFeature([File]),
        ConfigModule.forRoot({
            envFilePath: 'development.env',
        }),
    ],
    controllers: [
        FileController
    ],
    providers: [
        FileService, UploadFactory
    ],
    exports: [
        FileService
    ]
})
export class FileModule { }
