import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ImageIdAndUrlDto } from '@app/core/file/service/file.service';
import { NewsDetail } from '../../entity/news.entity';
import * as _ from 'lodash';
export namespace News {

    export class NewsDetailDto {
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

        // @ApiProperty()
        // @Expose()
        // description: string;

        // @ApiProperty()
        // @Expose()
        // url: string;

        @ApiProperty()
        @Expose()
        isActive: boolean;
        @ApiProperty()
        @Expose()
        createTime: Date;

        // @ApiProperty()
        // @Expose()
        // images: ImageIdAndUrlDto[];

        @ApiProperty()
        @Expose()
        newsDetails: NewsDetail[];

        @ApiProperty()
        @Expose()
        get newsDetailsSortBySeq() {
            return _.sortBy(this.newsDetails, x => x.sequence);
        }
    }
}
