import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductTypeDto {
    @ApiProperty()
    @IsString()
    name: string;
}