import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { News } from './news.dto';
export class UpdateNewsDto {

    @ApiProperty()
    @IsNotEmpty()
    newsTypeId: number;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    subtitle: string;

    // @ApiProperty()
    // description: string;

    // @ApiProperty()
    // url: string;

    @ApiProperty()
    isActive: boolean;
    
    // @ApiProperty({ type: Number, isArray: true })
    // @IsArray()
    // imageIds: number[];

    @ApiProperty({ type: News.NewsDetailDto, isArray: true})
    @IsArray()
    newsDetails: News.NewsDetailDto[];
}