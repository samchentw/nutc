import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ShopTypeEnumArray, ShopTypeEnum } from '../enum/enum';

export class UpdateShopDto {
    @ApiProperty()
    id: number;

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
    @IsNotEmpty()
    shopType: ShopTypeEnum;


    @ApiProperty({ type: Number, isArray: true })
    @IsArray()
    imageIds: number[];
}