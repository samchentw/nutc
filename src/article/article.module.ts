import { Module, HttpModule } from '@nestjs/common';
import { ArticleEntity } from './entity/article.entity';
import { TagEntity } from './entity/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './service/base/article.service';
import { ArticleController } from './controller/article.controller';
import { TagController } from './controller/tag.controller';
import { TagService } from './service/base/tag.service';
import { TestService } from './service/test.service';
import { ExcelFactory } from '@app/core/shared';
@Module({
    controllers:[
        ArticleController,TagController
    ],
    imports:[
        HttpModule,
        TypeOrmModule.forFeature([ArticleEntity,TagEntity]),
    ],
    providers:[        
        ArticleService,TagService,ExcelFactory,TestService
    ]
})
export class ArticleModule {}
