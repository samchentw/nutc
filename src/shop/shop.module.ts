import { Module } from '@nestjs/common';
import { ShopEntity } from './entity/shop.entity';
import { ProductEntity } from './entity/product.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './service/shop.service';
import { ProductService } from './service/product.service';
import { ExcelFactory } from '@app/core/shared';
import { ShopController } from './controller/shop.controller';

@Module({
    controllers:[
        ShopController
    ],
    imports: [
        TypeOrmModule.forFeature([ShopEntity, ProductEntity])
    ],
    providers: [
        ShopService,
        ProductService,
        ExcelFactory,
    ]
})
export class ShopModule { }
