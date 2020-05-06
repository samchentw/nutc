import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    // @ApiProperty()
    // type: string;

    @ApiProperty()
    description: string;


    @ApiProperty()
    isDelete: boolean;

    @ApiProperty({ type: Number, isArray: true })
    imageIds: number[];

    @ApiProperty({ type: Number, isArray: true })
    productTypeIds: number[];
}