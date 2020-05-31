import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News, NewsType, Contact } from './entity';
import { NewsService, CmsJob, NewsTypeService, ContactService } from './service';
import { NewsController, NewsTypeController, ContactController } from './controller';
import { FileModule } from '@app/core/file/file.module';
@Module({
    imports: [
        FileModule,
        TypeOrmModule.forFeature([News, NewsType, Contact])
    ],
    controllers: [
        NewsController,
        NewsTypeController,
        ContactController
    ],
    providers: [
        NewsService,
        NewsTypeService,
        ContactService,
        CmsJob,
    ]
})
export class CmsModule { }
