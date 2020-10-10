import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ImageIdAndUrlDto } from '@app/core/file/service/file.service';
import { NewsDetail } from '../../entity/news.entity';
import * as _ from 'lodash';
import { NewsType } from '../newsType/newsType.dto';
export namespace News {

    export class NewsDetailDto {
        @ApiProperty()
        id: string;

        @ApiProperty()
        subtitle: string;

        @ApiProperty()
        description: string;

        @ApiProperty()
        sequence: number;

        @ApiProperty()
        ImageId: number;
    }
    export class NewsDto {
        @ApiProperty()
        @Expose()
        id: number;

        @ApiProperty()
        @Expose()
        title: string;

        @ApiProperty()
        @Expose()
        subtitle: string;

        @ApiProperty()
        @Expose()
        isActive: boolean;
        @ApiProperty()
        @Expose()
        createTime: Date;

        @ApiProperty({ type: NewsDetailDto, isArray: true })
        @Expose()
        newsDetails: NewsDetail[];

        @ApiProperty({ type: NewsDetailDto, isArray: true })
        @Expose()
        get newsDetailsSortBySeq():NewsDetail[] {
            return _.sortBy(this.newsDetails, x => x.sequence);
        }

        @ApiProperty({type:NewsType.NewsTypeDto})
        @Expose()
        @Type(() => NewsType.NewsTypeDto)
        newsType:NewsType.NewsTypeDto;
        

        @ApiProperty()
        @Expose()
        get isAvalibleAddTravel():boolean{
            if(this.newsType.name.includes("兩天一夜過夜型")) return true;
            return false;
        }
    }
}
