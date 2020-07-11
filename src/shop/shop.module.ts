import { FileModule } from '@app/core/file/file.module';
import { ExcelFactory } from '@app/core/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './controller/shop.controller';
import { Shop } from './entity/shop.entity';
import { ShopService } from './service/shop.service';

@Module({
    controllers: [
        ShopController
    ],
    imports: [
        TypeOrmModule.forFeature([Shop]),
        FileModule
    ],
    providers: [
        ShopService,
        ExcelFactory,
    ]
})
export class ShopModule { }
