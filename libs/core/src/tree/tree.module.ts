import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TreeEntity } from './entity/tree.entity';
import { TreeController } from './controller/tree.controller';
import { TreeService } from './service/tree.service';
@Module({
    controllers:[
        TreeController
    ],
    imports:[
        TypeOrmModule.forFeature([TreeEntity])
    ],
    providers:[
        TreeService
    ]
})
export class TreeModule {}
