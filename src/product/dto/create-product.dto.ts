import { IsString, IsNumber, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    time: string;

    @ApiProperty()
    @IsString()
    owner: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsBoolean()
    isDelete: boolean;

    @ApiProperty()
    @IsBoolean()
    isSell: boolean;

    @ApiProperty({ type: Number, isArray: true })
    @IsArray()
    imageIds: number[];

    @ApiProperty({ type: Number })
    @IsNumber()
    productTypeId: number;
}