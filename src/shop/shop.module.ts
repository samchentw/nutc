import { Module } from '@nestjs/common';
import { ShopEntity } from './entity/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports:[
        TypeOrmModule.forFeature([ShopEntity])
    ]
})
export class ShopModule {}
