import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ImageIdAndUrlDto } from '@app/core/file/service/file.service';
import { NewsDetail } from '../../entity/news.entity';
import * as _ from 'lodash';
export namespace News {

    export class NewsDetailDto {
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
    }
}
