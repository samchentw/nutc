import { ApiProperty } from '@nestjs/swagger';
import { News } from './news.dto';
export namespace NewsType{
    export class NewsTypeDto{
        @ApiProperty()
        id:number;
        @ApiProperty()
        name:string;
    }

    export class NewsTypeWithDetailDto{
        @ApiProperty()
        id:number;
        @ApiProperty()
        name:string;
        @ApiProperty()
        news:News.NewsDto[];
    }
}
