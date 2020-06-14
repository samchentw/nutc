import { IsString, IsNumber, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';
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