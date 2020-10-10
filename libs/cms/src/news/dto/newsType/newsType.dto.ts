import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { News } from '../news/news.dto';
export namespace NewsType {
    export class NewsTypeDto {
        @ApiProperty()
        @Expose()
        id: number;
        @ApiProperty()
        @Expose()
        name: string;
    }

    export class NewsTypeWithDetailDto {
        @ApiProperty()
        @Expose()
        id: number;

        @ApiProperty()
        @Expose()
        name: string;
        
        @ApiProperty()
        @Expose()
        news: News.NewsDto[];
    }
}
