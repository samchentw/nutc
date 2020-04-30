import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';
import { FileService } from './service/file.service';
import { UploadFactory } from '@app/core/shared';
import { FileEntity } from './entity/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports:[
        TypeOrmModule.forFeature([FileEntity])
    ],
    controllers:[
        FileController
    ],
    providers:[
        FileService,UploadFactory
    ]
})
export class FileModule {}
