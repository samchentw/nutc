import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateNewsDto {

    @ApiProperty()
    newsTypeId: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    subtitle: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    url: string;
    @ApiProperty()
    isActive: boolean;
    @ApiProperty({ type: Number, isArray: true })
    @IsArray()
    imageIds: number[];
}