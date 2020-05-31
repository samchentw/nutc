import { IsString, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    // @ApiProperty()
    // type: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsBoolean()
    isDelete: boolean;

    @ApiProperty()
    @IsBoolean()
    isSell: boolean;

    @ApiProperty({ type: Number, isArray: true })
    // @IsArray()
    imageIds: number[];

    @ApiProperty()
    @IsString()
    productImage: string;

    // @ApiProperty({ type: Number })
    // @IsNumber()
    // productTypeId: number;
}