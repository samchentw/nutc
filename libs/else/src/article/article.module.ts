import { Module, HttpModule } from '@nestjs/common';
import { ArticleEntity } from './entity/article.entity';
import { TagEntity } from './entity/tag.entity';
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
        TypeOrmModule.forFeature([ArticleEntity,TagEntity]),
    ],
    providers:[        
        ArticleService,TagService
    ]
})
export class ArticleModule {}
