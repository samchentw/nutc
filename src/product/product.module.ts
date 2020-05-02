import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '@app/core/file/file.module';
import { ProductEntity } from './entity/product.entity';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';

@Module({
    controllers:[
        ProductController
    ],
    imports:[
        FileModule,
        TypeOrmModule.forFeature([ProductEntity])
    ],
    providers:[
        ProductService
    ]
})
export class ProductModule {}
