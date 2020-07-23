import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

import { News } from './news.dto';




export class CreateNewsDto {
    @ApiProperty()
    @Exclude()
    newsTypeId: number;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    subtitle: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty({ type: News.NewsDetailDto, isArray: true})
    @IsArray()
    newsDetails: News.NewsDetailDto[];
}

