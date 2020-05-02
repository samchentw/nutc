import { Module } from '@nestjs/common';
import { ShopEntity } from './entity/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '@app/core/file/file.module'
import { ShopService } from './service/shop.service';
import { ExcelFactory } from '@app/core/shared';
import { ShopController } from './controller/shop.controller';

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
