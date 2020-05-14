import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News, NewsType } from './entity';
import { NewsService, CmsJob, NewsTypeService } from './service';
import { NewsController, NewsTypeController } from './controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([News, NewsType])
    ],
    controllers: [
        NewsController,
        NewsTypeController
    ],
    providers: [
        NewsService,
        NewsTypeService,
        CmsJob,
    ]
})
export class CmsModule { }
