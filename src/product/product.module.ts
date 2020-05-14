import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '@app/core/file/file.module';
import { Product } from './entity/product.entity';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { ProductType } from './entity/productType.entity';
import { ProductTypeService } from './service/productType.service';
import { ProductTypeController } from './controller/productType.controller';

@Module({
    controllers: [
        ProductController,
        ProductTypeController
    ],
    imports: [
        FileModule,
        TypeOrmModule.forFeature([Product, ProductType])
    ],
    providers: [
        ProductService,
        ProductTypeService
    ],
    exports: [
        ProductService,
        ProductTypeService
    ]
})
export class ProductModule { }
