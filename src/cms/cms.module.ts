import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsNewsEntity, CmsNewsTypeEntity } from './entity';
import { NewsService, CmsJob, NewsTypeService } from './service';
import { NewsController,NewsTypeController } from './controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([CmsNewsEntity,CmsNewsTypeEntity])
    ],
    controllers:[
        NewsController,
        NewsTypeController
    ],
    providers:[
        NewsService,
        NewsTypeService,
        CmsJob,
    ]
})
export class CmsModule {}
