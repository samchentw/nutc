import { Module } from '@nestjs/common';
import { ShopEntity } from './entity/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './service/shop.service';
import { ExcelFactory } from '@app/core/shared';
import { ShopController } from './controller/shop.controller';
import { FileModule } from '@app/core/file/file.module'
@Module({
    controllers:[
        ShopController
    ],
    imports: [
        TypeOrmModule.forFeature([ShopEntity]),
        FileModule
    ],
    providers: [
        ShopService,
        ExcelFactory,
    ]
})
export class ShopModule { }
