import { Module } from '@nestjs/common';
import { FileModule } from '@app/core/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entity/blog.entity';
import { BlogService } from './service/blog.service';
@Module({
    controllers: [
    ],
    imports: [
        FileModule,
        TypeOrmModule.forFeature([Blog])
    ],
    providers: [
        BlogService
    ],
    exports: [
    ]
})
export class BlogModule { }
