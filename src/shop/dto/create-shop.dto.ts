import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ShopTypeEnum, ShopTypeEnumArray } from '../enum/enum';

export class CreateShopDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    remark: string;

    @ApiProperty()
    isDelete: boolean;

    @ApiProperty({ enum: ShopTypeEnumArray })
    @IsNumber()
    shopType: ShopTypeEnum;

    @ApiProperty({ type: Number, isArray: true })
    @IsArray()
    imageIds: number[];
}