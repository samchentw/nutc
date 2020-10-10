
import { News } from '@app/cms/news/dto/news/news.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ConsumerNewsDto extends News.NewsDto {

    @ApiProperty()
    @Expose()
    isComplete: boolean;

    @ApiProperty()
    @Expose()
    newsTypeName: string;

    
}