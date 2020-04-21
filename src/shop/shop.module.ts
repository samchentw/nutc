import { Module } from '@nestjs/common';
import { ShopEntity } from './entity/shop.entity';
import { ProductEntity } from './entity/product.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './service/shop.service';
import { ProductService } from './service/product.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([ShopEntity, ProductEntity])
    ],
    providers: [
        ShopService,
        ProductService,
    ]
})
export class ShopModule { }
