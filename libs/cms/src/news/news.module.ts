import { Module } from '@nestjs/common';
import { FileModule } from '@app/core/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entity/news.entity';
import { NewsType } from './entity/newsType.entity';
import { NewsController } from './controller/news.controller';
import { NewsTypeController } from './controller/newsType.controller';
import { NewsService } from './service/news.service';
import { NewsTypeService } from './service/newsType.service';


@Module({
    imports: [
        FileModule,
        TypeOrmModule.forFeature([News, NewsType])
    ],
    controllers: [
        NewsController,
        NewsTypeController
    ],
    providers: [
        NewsService,
        NewsTypeService
    ],
    exports: [
        NewsService,
        NewsTypeService
    ]
})
export class NewsModule { }
