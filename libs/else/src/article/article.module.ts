import { Module, HttpModule } from '@nestjs/common';
import { Article } from './entity/article.entity';
import { Tag } from './entity/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './service/article.service';
import { ArticleController } from './controller/article.controller';
import { TagController } from './controller/tag.controller';
import { TagService } from './service/tag.service';
@Module({
    controllers:[
        ArticleController,TagController
    ],
    imports:[
        HttpModule,
        TypeOrmModule.forFeature([Article,Tag]),
    ],
    providers:[        
        ArticleService,TagService
    ]
})
export class ArticleModule {}
